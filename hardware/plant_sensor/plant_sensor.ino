#include <Arduino.h>

#include <Esp.h>
#include <ESP8266WiFiMulti.h>

#include <WebSocketsClient.h>

ESP8266WiFiMulti WiFiMulti;
WebSocketsClient webSocket;

#define SERIAL Serial

#define GP0 0
#define GP2 2
#define GREEN_BUTTON 0

#define CAPACITOR 2
#define CAPACITOR_RATE 1000 //1 s

uint64_t last_capacitor = 0L;

#define CAPACITOR_BAILOUT 1000*10 //10 ms

#define NETWORK_NAME "WinterfellOTG"
//Fite me irl
#define NETWORK_PASS "THEothers"

uint32_t hwid;

#define ENABLE_LED
//#define BUILTIN_LED dont use this its already defined

#ifdef ENABLE_LED
  #define dbg_printf(...) while(0) {}
  #define dbg_initserial(rate) while(0) {}
  #define init_LED() do {pinMode(BUILTIN_LED, OUTPUT); set_LED(HIGH);} while(0);
#else
  #define dbg_printf(...) SERIAL.printf(__VA_ARGS__)
  #define dbg_initserial(rate) SERIAL.begin(rate)
  #define init_LED() while(0) {}
#endif

//Note: LOW is on, HIGH is off
void set_LED(uint8_t mode) {
  #ifdef ENABLE_LED
    digitalWrite(BUILTIN_LED, mode);
  #else
    if (mode == LOW) {
        dbg_printf("[LED] LED on!\n");
    } else if (mode == HIGH) {
        dbg_printf("[LED] LED off!\n");
    } else {
        dbg_printf("[LED] Writing %X to the LED!", mode);
    }
  #endif
}

bool blink_mode = false;
uint64_t last_blink = 0L;
#define BLINK_TIME 750L

bool led_on = false;
void blink_on() {
    blink_mode = true;
}
void blink_off() {
    blink_mode = false;
    set_LED(HIGH);
}
void check_blink() {
    if (blink_mode) {
        uint64_t now = millis();
        if (now > last_blink+BLINK_TIME) {
            last_blink = now;
            if (!led_on) {
                set_LED(LOW);
                led_on = true;
            } else {
                set_LED(HIGH);
                led_on = false;
            }
        }
    } else {
        if (led_on) {
            set_LED(HIGH);
            led_on = false;
        }
    }
}

//only handles one one command (LED:)
void remoteSignal(const char* cmd, size_t len) {
    const char* command = "LED:";
    
    if (len < sizeof(command)-1) return;    

    for (const char* c = cmd, *d = command; *d; c++, d++) {
        if (*c != *d) return;
    }

    char lastchar = cmd[sizeof(command)];

    if (lastchar == '1') {
        dbg_printf("[COM] Blink on!\n");
        blink_on();
    } else if (lastchar == '0') {
        dbg_printf("[COM] Blink off!\n");
        blink_off();
    } else {
        dbg_printf("[COM] server u so high\n");
    }
}

void webSocketEvent(WStype_t type, uint8_t * payload, size_t length) {
    switch(type) {
        case WStype_DISCONNECTED:
            dbg_printf("[WSc] Disconnected!\n");
            blink_mode = false;
            break;
            
        case WStype_CONNECTED:
            dbg_printf("[WSc] Connected to url: %s\n",  payload);
            break;
            
        case WStype_TEXT:
            dbg_printf("[WSc] got text: \"%s\"\n", payload);
            remoteSignal((char*) payload, length);
            break;
            
        case WStype_BIN:
            dbg_printf("[WSc] get binary length: %u\n\n", length);
            hexdump(payload, length);
            dbg_printf("\n\n");
            break;
            
        default:
            dbg_printf("[Wsc] Unknown event %i!", type);
    }
}

#define BEEP_BUFFER_SIZE 10
char beep_buffer[BEEP_BUFFER_SIZE];
const char* beep() {
    String beep = "";
    size_t num_beeps = 4;
    char* beeps[] = {"BEEP", "BOOP", "BOP", "BIP"};
    
    int first = random(num_beeps);
    beep += beeps[first];
    
    char* tmp = beeps[num_beeps-1];
    beeps[num_beeps-1] = beeps[first];
    beeps[first] = tmp;

    beep += " ";
    beep += beeps[random(num_beeps-1)];

    beep.toCharArray(beep_buffer, BEEP_BUFFER_SIZE);

    return &beep_buffer[0];
}

String make_soil_json(long mms) {
    String json = "{";
    json += "\"hwid\":"; json += hwid; json += ",";
    json += "\"type\":\"soil_moisture\",";
    json += "\"data\":"; json += mms;// json += ",";
    json += "}";
    return json;
}

/* delayMicroseconds
void sleep_micros(unsigned long mms) {
    unsigned long end = micros()+mms;
    while (micros() < end) {}
}*/

int ratio = 0;

void setup() {
    //74880 is chip default
    dbg_initserial(74880);
    init_LED();
    
    //pinMode(GREEN_BUTTON, INPUT_PULLUP); 
    
    dbg_printf("\n%s. PLANT-BOT HAS BOOTED UP AND GAINED SENTIENCE.\n", beep());

    hwid = ESP.getChipId();

    //SERIAL.print(ESP.getChipId());

    WiFiMulti.addAP(NETWORK_NAME, NETWORK_PASS);
    dbg_printf("ESTABLISHING CONNECTION TO MOTHERSHIP...\n");

    while(WiFiMulti.run() != WL_CONNECTED) {
        delay(100);
        if (++ratio > 100) {
            ratio = 0;
            dbg_printf("%s. STILL CONNECTING...\n", beep());
        }
    }

    dbg_printf("CONNECTION ESTABLISHED. BEGINNING GROUND INVASION.\n");

    webSocket.begin("planties.meteor.com", 80, "/sensorData");
    webSocket.onEvent(webSocketEvent);
}

long poll_capacitor() {
    pinMode(CAPACITOR, OUTPUT);
    digitalWrite(CAPACITOR, HIGH);
    delayMicroseconds(1000);

    uint64_t startm;
    uint64_t endm;
    uint64_t bailout;
    
    pinMode(CAPACITOR, INPUT);
    startm = micros();
    bailout = startm + CAPACITOR_BAILOUT;

    while (digitalRead(CAPACITOR) && micros() < bailout) {wdt_reset();}
    endm = micros();

    if (endm < bailout) {
        long diff = endm - startm;
        webSocket.sendTXT(make_soil_json(diff));
        return diff;
    } else {
        webSocket.sendTXT(make_soil_json(-1));
        return -1;
    }
}

void loop() {
    webSocket.loop();

    check_blink();

    long now = millis();
    if (now > last_capacitor + CAPACITOR_RATE) {
        last_capacitor = now;
        poll_capacitor();
    }
}

/*long wet = 150L;
  long dry = 3200L;
  double wetness = 100.0 * (1.0 - double(diff - wet)/double(dry - wet));
  
  //Took diff micros!
  message += "Discharged in ";
  message += diff;
  message += " microseconds!";

  if (diff < 10) {
      message += "\nYour metal is probably touching!";
  } else if (wetness > 0.0 && wetness < 100.0) {
      message += "\nProbably about ";
      message += wetness;
      message += "% wet!";
  } else if (wetness <= 0.0) {
      message += "\nProbably very dry!";
  } else {
      message += "\nProbably very wet!";
  }*/
