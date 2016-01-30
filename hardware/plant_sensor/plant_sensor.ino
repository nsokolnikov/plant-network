/*
 * WebSocketClient.ino
 *
 *  Created on: 24.05.2015
 *
 */

#include <Arduino.h>

//#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>

#include <WebSocketsClient.h>

//#include <Hash.h>

ESP8266WiFiMulti WiFiMulti;
WebSocketsClient webSocket;

bool active = true;

#define SERIAL Serial

#define GP0 0
#define GP2 2
#define GREEN_BUTTON 0
#define CAPACITOR 2

void webSocketEvent(WStype_t type, uint8_t * payload, size_t length) {
    switch(type) {
        case WStype_DISCONNECTED:
            SERIAL.printf("[WSc] Disconnected!\n");
            break;
            
        case WStype_CONNECTED:
            {
                SERIAL.printf("[WSc] Connected to url: %s\n",  payload);
				        //webSocket.sendTXT("[WSc] First connection!");
            }
            break;
            
        case WStype_TEXT:
            SERIAL.printf("[WSc] get text: %s\n", payload);
            break;
            
        case WStype_BIN:
            SERIAL.printf("[WSc] get binary length: %u\n", length);
            hexdump(payload, length);
            break;
            
        default:
            SERIAL.printf("[Wsc] Unknown event %i!", type);
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

/* delayMicroseconds
void sleep_micros(unsigned long mms) {
    unsigned long end = micros()+mms;
    while (micros() < end) {}
}*/

int ratio = 0;

void setup() {
    SERIAL.begin(115200);
    //pinMode(GREEN_BUTTON, INPUT_PULLUP); 
    
    SERIAL.printf("\n%s. PLANT-BOT HAS BOOTED UP AND GAINED SENTIENCE.\n", beep());

    WiFiMulti.addAP("WinterfellOTG", "THEothers");
    SERIAL.printf("ESTABLISHING CONNECTION TO MOTHERSHIP...\n");

    while(WiFiMulti.run() != WL_CONNECTED) {
        delay(100);
        if (++ratio > 100) {
            ratio = 0;
            SERIAL.printf("%s. STILL CONNECTING...\n", beep());
        }
    }

    SERIAL.printf("CONNECTION ESTABLISHED. BEGINNING GROUND INVASION.\n");

    webSocket.begin("192.168.43.132", 80);
    webSocket.onEvent(webSocketEvent);
}

void loop() {
    webSocket.loop();
  
    //SERIAL.printf("\nDelaying for 1 s...\n");
    pinMode(CAPACITOR, OUTPUT);
    digitalWrite(CAPACITOR, HIGH);
    delayMicroseconds(1000*1000);


    unsigned long startm;
    unsigned long endm;
    unsigned long bailout;
    
    pinMode(CAPACITOR, INPUT);
    startm = micros();
    bailout = startm + 1000*1000; //1 second

    while (digitalRead(CAPACITOR) && micros() < bailout) {wdt_reset();}
    endm = micros();

    String message = "";
    if (endm < bailout) {
        unsigned long diff = endm - startm;
        unsigned long wet = 150L;
        unsigned long dry = 3200L;
        double wetness = 100.0 * (1.0 - double(diff - wet)/double(dry-wet));
        
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
        }
        webSocket.sendTXT(message);
    } else {
        webSocket.sendTXT("Bailed out!\nYou probably don't have any dirt!");
    }
    
    
    //SERIAL.printf("Timing until low...\n");
    /*unsigned long endm;
    unsigned long startm = micros()

    while (digitalRead(GREEN_BUTTON)) {wdt_reset();}
    unsigned long endm = micros();
    unsigned long duration = endm-start;
    //SERIAL.printf("Took %i micros to discharge!\n", duration);
  
    /*if (active) {
        if (++ratio > 200) {
            ratio = 0;
            String foo = "RESISTANCE IS FUTILE. ";
            foo += beep();
            foo = "Sending \"" + foo + "\"\n";
            SERIAL.print(foo);
            webSocket.sendTXT(foo);
        }
      
        webSocket.loop();
        int green_state = digitalRead(GREEN_BUTTON);
        if (!green_state) {
            SERIAL.printf("INVASION TERMINATED. BEAMING UP.\n");
            webSocket.disconnect();
            active = false;
        } 
    }*/
}
