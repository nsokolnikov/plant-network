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

#define USE_SERIAL Serial

#define GP0 0
#define GP2 2
#define GREEN_BUTTON 0

void webSocketEvent(WStype_t type, uint8_t * payload, size_t length) {
    switch(type) {
        case WStype_DISCONNECTED:
            USE_SERIAL.printf("[WSc] Disconnected!\n");
            break;
            
        case WStype_CONNECTED:
            {
                USE_SERIAL.printf("[WSc] Connected to url: %s\n",  payload);
				        webSocket.sendTXT("[WSc] First connection!");
            }
            break;
            
        case WStype_TEXT:
            USE_SERIAL.printf("[WSc] get text: %s\n", payload);
            break;
            
        case WStype_BIN:
            USE_SERIAL.printf("[WSc] get binary length: %u\n", length);
            hexdump(payload, length);
            break;
            
        default:
            USE_SERIAL.printf("[Wsc] Unknown event %i!", type);
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

int ratio = 0;

void setup() {
    USE_SERIAL.begin(115200);
    pinMode(GREEN_BUTTON, INPUT_PULLUP);
    
    USE_SERIAL.printf("%s. PLANT-BOT HAS BOOTED UP AND GAINED SENTIENCE.\n", beep());
    
    //Serial.setDebugOutput(true);
    //USE_SERIAL.setDebugOutput(true);

    /*
    USE_SERIAL.println();
    USE_SERIAL.println();
    USE_SERIAL.println();

      for(uint8_t t = 4; t > 0; t--) {
          USE_SERIAL.printf("[SETUP] BOOT WAIT %d...\n", t);
          USE_SERIAL.flush();
          delay(1000);
      }
    */

    WiFiMulti.addAP("WinterfellOTG", "THEothers");
    USE_SERIAL.printf("ESTABLISHING CONNECTION TO MOTHERSHIP...\n");

    //WiFi.disconnect();
    while(WiFiMulti.run() != WL_CONNECTED) {
        delay(100);
        if (++ratio > 100) {
            ratio = 0;
            USE_SERIAL.printf("%s. STILL CONNECTING...\n", beep());
        }
    }

    USE_SERIAL.printf("CONNECTION ESTABLISHED. BEGINNING GROUND INVASION.\n");

    webSocket.begin("echo.websocket.org", 80);
    webSocket.onEvent(webSocketEvent);
}

void loop() {
    String foo = "RESISTANCE IS FUTILE";
    if (++ratio > 10) {
        ratio = 0;
        webSocket.sendTXT(foo);
    }
    
    if (active) {
        webSocket.loop();
    }
  
    int green_state = digitalRead(GREEN_BUTTON);
    if (!green_state) {
        USE_SERIAL.printf("INVASION TERMINATED. BEAMING UP.\n");
        webSocket.disconnect();
        active = false;
    }
}
