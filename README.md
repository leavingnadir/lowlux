# Main Website 
<img width="1545" height="3624" alt="localhost_3000_" src="https://github.com/user-attachments/assets/1848016c-6e6a-41e3-8521-a8cc9c16d5c0" />

# Dashboard
<img width="1920" height="953" alt="image" src="https://github.com/user-attachments/assets/c7c76ab8-69ec-48f1-8db5-7c88e1647ab6" />

## ESP32 Sample Data set code for testing 

````
```
#include <WiFi.h>
#include <WebSocketsClient.h>

// ==== Wi-Fi Settings ====
const char* ssid = "Dialog 4G";        // Replace with your Wi-Fi name
const char* password = "sfreferergeg"; // Replace with your Wi-Fi password

// ==== WebSocket Settings ====
const char* ws_server = "192.168.0.000";    // Replace with your Node.js server IP
const uint16_t ws_port = 5000;              // Must match Node.js server port

WebSocketsClient webSocket;

// ==== Function to handle WebSocket events ====
void webSocketEvent(WStype_t type, uint8_t * payload, size_t length) {
  switch(type) {
    case WStype_DISCONNECTED:
      Serial.println("WebSocket Disconnected");
      break;
    case WStype_CONNECTED:
      Serial.println("WebSocket Connected");
      break;
    case WStype_TEXT:
      Serial.printf("Received: %s\n", payload);
      break;
    case WStype_BIN:
      Serial.println("Binary data received");
      break;
    case WStype_ERROR:
      Serial.println("WebSocket Error");
      break;
    case WStype_PING:
      Serial.println("Ping received");
      break;
    case WStype_PONG:
      Serial.println("Pong received");
      break;
  }
}

// ==== Setup function ====
void setup() {
  Serial.begin(115200);
  
  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  Serial.println("Connecting to Wi-Fi...");
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println();
  Serial.println("Wi-Fi connected!");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());

  // Connect to WebSocket server
  webSocket.begin(ws_server, ws_port, "/");
  webSocket.onEvent(webSocketEvent);

  Serial.print("Connecting to WS server at ");
Serial.println(ws_server);

}

// ==== Main loop ====
void loop() {
  webSocket.loop(); // keep WebSocket alive

  // Send JSON data every 5 seconds
  static unsigned long lastTime = 0;
  if (millis() - lastTime > 5000) {
    lastTime = millis();
    String jsonData = "{\"temperature\":28,\"humidity\":55,\"brightness\":70,\"peopleCount\":3,\"totalPeopleCount\":10,\"energySaving\":123456}";
    webSocket.sendTXT(jsonData);  // send JSON as text
    Serial.println("Sent: " + jsonData);
  }
}
```
````

## ESP32 LOWLUX OG code

````
```
#include <DHT.h>
#include <LiquidCrystal_I2C.h>

// Pin setup
#define IR1_PIN 32
#define IR2_PIN 33
#define LDR_PIN 34
#define FAN_PIN 25       // DC motor for fan
#define LIGHT_PIN 26     // LED for light
#define RELAY_AC_PIN 27  // Relay for AC

// DHT22 setup
#define DHTPIN 4
#define DHTTYPE DHT22
DHT dht(DHTPIN, DHTTYPE);

// LCD setup (I2C address may vary, often 0x27 or 0x3F)
LiquidCrystal_I2C lcd(0x27, 16, 2);

// Variables
bool roomOccupied = false;

void setup() {
  Serial.begin(115200);

  pinMode(IR1_PIN, INPUT);
  pinMode(IR2_PIN, INPUT);
  pinMode(LDR_PIN, INPUT);
  
  pinMode(FAN_PIN, OUTPUT);
  pinMode(LIGHT_PIN, OUTPUT);
  pinMode(RELAY_AC_PIN, OUTPUT);

  dht.begin();
  lcd.init();
  lcd.backlight();

  lcd.setCursor(0,0);
  lcd.print("Smart Room Sys");
  delay(2000);
  lcd.clear();
}

void loop() {
  // Check occupancy (if either IR sensor detects movement)
  roomOccupied = digitalRead(IR1_PIN) == HIGH || digitalRead(IR2_PIN) == HIGH;

  // Get room conditions
  int ldrValue = analogRead(LDR_PIN);
  float temp = dht.readTemperature();

  Serial.print("LDR: "); Serial.print(ldrValue);
  Serial.print(" Temp: "); Serial.println(temp);

  if (roomOccupied) {
    // Lights control
    if (ldrValue < 2000) { // Adjust threshold for brightness
      digitalWrite(LIGHT_PIN, HIGH); // Turn on light
    } else {
      digitalWrite(LIGHT_PIN, LOW); // Bright enough, keep lights off
    }

    // Fan control
    if (temp > 24 && temp < 30) { // Comfortable warm
      digitalWrite(FAN_PIN, HIGH);
    } else {
      digitalWrite(FAN_PIN, LOW);
    }

    // AC control (via relay + LCD)
    if (temp >= 30) {
      digitalWrite(RELAY_AC_PIN, HIGH);
      lcd.setCursor(0,0);
      lcd.print("AC: ON        ");
    } else if (temp <= 20) {
      digitalWrite(RELAY_AC_PIN, LOW);
      lcd.setCursor(0,0);
      lcd.print("AC: OFF (Cold)");
    } else {
      digitalWrite(RELAY_AC_PIN, LOW);
      lcd.setCursor(0,0);
      lcd.print("AC: OFF (OK) ");
    }

  } else {
    // Nobody in the room → everything off
    digitalWrite(LIGHT_PIN, LOW);
    digitalWrite(FAN_PIN, LOW);
    digitalWrite(RELAY_AC_PIN, LOW);
    lcd.setCursor(0,0);
    lcd.print("Room Empty    ");
  }

  delay(2000); // update every 2s
}
```
````

#🛠️ Full Setup Guide
##1. Install Tools
Before coding, make sure you have these installed:

Arduino IDE
 (to upload ESP32 code)
ESP32 board package for Arduino IDE

In Arduino IDE → File → Preferences → paste this into Additional Boards Manager URLs:
````
```
(https://dl.espressif.com/dl/package_esp32_index.json)
```
````
Then go to Tools → Board → Board Manager → Install ESP32 by Espressif Systems
Node.js (latest LTS version) → Download Node.js
npm or yarn (comes with Node.js)
React project (Next.js or CRA works fine)

##2. Backend Setup (Node.js WebSocket Serer)

We need a server to act as the bridge between ESP32 and React.
Make a new folder for the backend:
````
```
mkdir lowlux-backend
cd lowlux-backend
npm init -y
npm install express ws cors

```
````
Create server.js and Run server
````
```
node server.js
```
````
✅ You should see:
````
```
HTTP & WS server running on port 5000
```
````
