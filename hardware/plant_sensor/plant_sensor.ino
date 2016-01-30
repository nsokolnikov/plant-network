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
/*
void webSocketEvent(WStype_t type, uint8_t * payload, size_t length) {
    switch(type) {
        case WStype_DISCONNECTED:
            SERIAL.printf("[WSc] Disconnected!\n");
            break;
            
        case WStype_CONNECTED:
            {
                SERIAL.printf("[WSc] Connected to url: %s\n",  payload);
				        webSocket.sendTXT("[WSc] First connection!");
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
}*/

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

void setup() {
    SERIAL.begin(115200);
    pinMode(GREEN_BUTTON, INPUT_PULLUP); 
    
    /*SERIAL.printf("\n%s. PLANT-BOT HAS BOOTED UP AND GAINED SENTIENCE.\n", beep());

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

    webSocket.begin("echo.websocket.org", 80);
    webSocket.onEvent(webSocketEvent);*/
}

void loop() {
    SERIAL.printf("\nDelaying for 1 s...\n");
    delayMicroseconds(1000*1000*1);

    SERIAL.printf("Timing until low...\n");
    unsigned long start = micros();

    while (digitalRead(GREEN_BUTTON)) {wdt_reset();}
    unsigned long endm = micros();
    unsigned long duration = endm-start;
    SERIAL.printf("Took %i micros to discharge!\n", duration);
  
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
