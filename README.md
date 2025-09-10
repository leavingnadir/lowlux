# ⚡ESP32 Sample Data set code for testing 

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

# ⚡Full Setup Guide

1️⃣ Install Tools
Before coding, make sure you have these installed:

Arduino IDE
 (to upload ESP32 code)
ESP32 board package for Arduino IDE

In Arduino IDE → File → Preferences → paste this into Additional Boards Manager URLs:

```
(https://dl.espressif.com/dl/package_esp32_index.json)
```

Then go to Tools → Board → Board Manager → Install ESP32 by Espressif Systems
Node.js (latest LTS version) → Download Node.js
npm or yarn (comes with Node.js)
React project (Next.js or CRA works fine)

 2️⃣ Backend Setup (Node.js WebSocket Serer)

We need a server to act as the bridge between ESP32 and React.
Make a new folder for the backend:

```
mkdir lowlux-backend
cd lowlux-backend
npm init -y
npm install express ws cors

```

Create server.js and Run server

```
node server.js
```

✅ You should see:

```
HTTP & WS server running on port 5000
```


3️⃣ ESP32 Setup (C++ with Arduino IDE)

Install WebSocketsClient library in Arduino IDE.
(Sketch → Include Library → Manage Libraries → search WebSocketsClient → Install)
Example code (update WiFi + server IP)

Get your PC/Laptop IP address (where Node.js is running)
Windows: ipconfig → look for IPv4 Address
Mac/Linux: ifconfig → look for inet address
Replace 192.168.1.100 in code with your actual local IP.
Press Win + R, type cmd, and hit Enter
In Command Prompt, type:

```
ipconfig
```

ipconfig
Look for your Wi-Fi adapter section. Find IPv4 Address

Replace in ESP32 Code
In your ESP32 code:

```
const char* ws_server = "192.168.1.105";  // 👈 Replace with your PC's IP
```

⚠️ Make sure:

ESP32 and your PC are connected to the same WiFi router
The backend server (server.js) is running on your PC before ESP32 connects

# ⚡C++ data isn’t appearing in React dashboard.

1️⃣ Make sure your WebSocket server is reachable

You’re using ESP32 connecting to your PC IP 192.168.8.198 on port 5000.
In React, you are connecting to "ws://192.168.1.100:5000".
⚠️ Problem: The IPs must match. If your PC’s IP is 192.168.8.198, your React code should use:

```
const ws = new WebSocket("ws://192.168.8.198:5000");
```

2️⃣ Make sure WebSocket in React is persistent
Use useRef properly:

```
const ws = useRef(null);

useEffect(() => {
  ws.current = new WebSocket("ws://192.168.8.198:5000"); // match IP

  ws.current.onopen = () => console.log("WebSocket connected");
  ws.current.onmessage = (event) => {
    console.log("Received:", event.data);
    setData(JSON.parse(event.data));
  };

  ws.current.onclose = () => console.log("WebSocket closed");
  ws.current.onerror = (err) => console.log("WebSocket error:", err);

  return () => ws.current.close();
}, []);
```

3️⃣ Find your Wi-Fi SSID (network name)

Windows:
  Click the Wi-Fi icon in the taskbar.
  Look for the name of the network you are connected to — that’s your SSID.

Mac:
  Click the Wi-Fi icon in the menu bar.
  The network with the checkmark is your SSID.

Smartphone (iOS / Android):
  Go to settings → Wi-Fi.
  The connected network name is your SSID.

# ⚡Find your Wi-Fi password

Windows:
  Open Control Panel → Network and Sharing Center.
  Click on your Wi-Fi → Wireless Properties → Security → Show characters.

Mac:
  Open Keychain Access → Search for your Wi-Fi name → Double click → Show password (may require Mac password).

Smartphone:
  Often printed on your router, or you can see it in Settings → Wi-Fi → Tap network → Show password.

# ⚡Can’t find server.js file

1️⃣ Convert Windows path to Git Bash path

Windows path:
C:\Users\Ultima\Downloads\lowlux


Git Bash path:
/c/Users/Ultima/Downloads/lowlux

2️⃣ Navigate to folder in Git Bash


```
cd /c/Users/Ultima/Downloads/lowlux
```


Then check the files with:

```
ls
```


3️⃣ Run Node server

```
node server.js
```


You should see:
HTTP & WS server running on port 5000

# ⚡Missing FQBN (Fully Qualified Board Name)

1️⃣ Install ESP32 board support (if not installed)

Open Arduino IDE → File → Preferences.
In “Additional Boards Manager URLs”, add:

```
[node server.js](https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json)
```

If there are already URLs, separate them with a comma.
Click OK.

2️⃣ Open Boards Manager

Go to Tools → Board → Boards Manager…
Search for ESP32.
Install “esp32 by Espressif Systems”.

3️⃣ Select your board

Go to Tools → Board → ESP32 Arduino.
Select your board type

4️⃣ Select the correct port

Connect your ESP32 via USB.
Go to Tools → Port and select the correct COM port.

5️⃣ Compile & Upload

Click Verify to compile.
Click Upload to flash your ESP32.
✅ This should remove the “Missing FQBN” error.

# ⚡WebSockets library

1️⃣ Check dependencies
Make sure you also have ESP32 board support installed, otherwise it won’t compile for ESP32.
Board selection: Tools → Board → ESP32 Arduino → ESP32 Dev Module

2️⃣ Restart Arduino IDE
Sometimes Arduino IDE needs a restart after library installation.

3️⃣ Compile again
Open your sketch lowlux_esp32.ino
Click Verify (check mark) → it should compile successfully.
Then click Upload to flash your ESP32.

# ⚡WebSocket client from ::ffff:192.168.8.198 disconnected


```
No DFU capable USB device available
Failed uploading: uploading error: exit status 74
```

This usually happens when the Arduino IDE can’t detect your ESP32 board. Let’s go step by step to fix it.if you don’t have an ESP32 physically connected, you cannot upload the sketch, and all errors like “No DFU device” or “exit status 74” are normal.

# ⚡DASHBOARD WITH NO UI (SANJANA LAP EDITION)

``` dashboard.js
"use client";

import { useEffect, useRef, useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState({
    temperature: 0,
    humidity: 0,
    ldr: 0,
    occupied: false,
    fan: 0,
    light: 0,
    ac: 0,
    peopleCount: 0,
    totalPeopleCount: 0,
  });

  const ws = useRef(null);
  const prevPeopleRef = useRef(0);

  useEffect(() => {
    ws.current = new WebSocket("ws://172.28.25.157:5000"); // <-- set your server IP

    ws.current.onopen = () => console.log("✅ WebSocket connected");
    ws.current.onclose = () => console.log("❌ WebSocket closed");

    ws.current.onmessage = (event) => {
      try {
        const incoming = JSON.parse(event.data);

        // compute people delta (only positive increases count toward total)
        const prev = prevPeopleRef.current ?? 0;
        const incomingPeople = incoming.peopleCount ?? 0;
        const delta = Math.max(0, incomingPeople - prev);

        prevPeopleRef.current = incomingPeople;

        setData((prev) => ({
          // sensor fields overwrite
          ...prev,
          ...incoming,
          // totalPeopleCount increments only when there's a positive delta
          totalPeopleCount: prev.totalPeopleCount + delta,
        }));
      } catch (err) {
        console.error("Invalid WS message:", event.data);
      }
    };

    return () => {
      if (ws.current) ws.current.close();
    };
  }, []);

  // send command to server (which will forward to ESP32 if connected)
  const sendCommand = (device, state) => {
    if (!ws.current || ws.current.readyState !== WebSocket.OPEN) {
      console.warn("WebSocket not ready");
      return;
    }

    const cmd = { type: "command", device, state };
    // optimistic update: update local UI immediately
    setData((prev) => ({ ...prev, [device]: state }));
    ws.current.send(JSON.stringify(cmd));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">📊 Smart Room Dashboard</h1>

      {/* Sensor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">🌡 Temperature</div>
          <div className="text-3xl font-semibold">{data.temperature} °C</div>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">💧 Humidity</div>
          <div className="text-3xl font-semibold">{data.humidity} %</div>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">💡 Brightness (LDR)</div>
          <div className="text-3xl font-semibold">{data.ldr}</div>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">👥 Current People</div>
          <div className="text-3xl font-semibold">{data.peopleCount}</div>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">📊 Total People</div>
          <div className="text-3xl font-semibold">{data.totalPeopleCount}</div>
          <button
            className="mt-2 px-3 py-1 bg-red-500 text-white rounded"
            onClick={() => setData((prev) => ({ ...prev, totalPeopleCount: 0 }))}
          >
            Reset Total
          </button>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">🚪 Occupied</div>
          <div className="text-3xl font-semibold">
            {data.occupied ? "Yes ✅" : "No ❌"}
          </div>
        </div>
      </div>

      {/* Controls */}
      <h2 className="text-2xl font-bold mt-8 mb-4">⚙️ Controls</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Fan */}
        <div className="p-4 bg-white rounded shadow text-center">
          <div className="text-sm text-gray-500">🌀 Fan</div>
          <div className="text-2xl font-semibold my-2">{data.fan ? "ON" : "OFF"}</div>
          <div className="flex justify-center gap-3">
            <button
              className="px-4 py-2 bg-green-600 text-white rounded"
              onClick={() => sendCommand("fan", 1)}
            >
              Turn ON
            </button>
            <button
              className="px-4 py-2 bg-gray-700 text-white rounded"
              onClick={() => sendCommand("fan", 0)}
            >
              Turn OFF
            </button>
          </div>
        </div>

        {/* Light */}
        <div className="p-4 bg-white rounded shadow text-center">
          <div className="text-sm text-gray-500">💡 Light</div>
          <div className="text-2xl font-semibold my-2">{data.light ? "ON" : "OFF"}</div>
          <div className="flex justify-center gap-3">
            <button
              className="px-4 py-2 bg-green-600 text-white rounded"
              onClick={() => sendCommand("light", 1)}
            >
              Turn ON
            </button>
            <button
              className="px-4 py-2 bg-gray-700 text-white rounded"
              onClick={() => sendCommand("light", 0)}
            >
              Turn OFF
            </button>
          </div>
        </div>

        {/* AC */}
        <div className="p-4 bg-white rounded shadow text-center">
          <div className="text-sm text-gray-500">❄️ AC</div>
          <div className="text-2xl font-semibold my-2">{data.ac ? "ON" : "OFF"}</div>
          <div className="flex justify-center gap-3">
            <button
              className="px-4 py-2 bg-green-600 text-white rounded"
              onClick={() => sendCommand("ac", 1)}
            >
              Turn ON
            </button>
            <button
              className="px-4 py-2 bg-gray-700 text-white rounded"
              onClick={() => sendCommand("ac", 0)}
            >
              Turn OFF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

# ⚡SERVER.CJS WITH C++ BASIC INTERGRATION FOR AVI CODE (SANJANA LAP EDITION)

``` server.cjs
/*-------------------------------------------*/
/* ESP32 <-> Web Dashboard Bridge + Simulator */
/*  - Keeps device states (fan/light/ac) on   */
/*    server so simulator can't overwrite    */
/*  - Forwards commands from dashboard to    */
/*    ESP32 (if connected)                    */
/*  - Simulator runs only when ESP32 offline */
/*-------------------------------------------*/
const express = require("express");
const { WebSocketServer, WebSocket } = require("ws");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = 5000;
const OVERRIDE_TTL = 30 * 1000; // 30 seconds: how long a dashboard command remains authoritative

const server = app.listen(PORT, () =>
  console.log(`✅ HTTP + WebSocket server running on port ${PORT}`)
);

const wss = new WebSocketServer({ server });

// Track ESP32 client
let esp32Client = null;

// Latest sensor snapshot (temperature, humidity, ldr, peopleCount, occupied, etc.)
let latestSensors = {};

// Server authoritative device states (persist between updates)
let deviceStates = {
  fan: 0,
  light: 0,
  ac: 0,
};

// Last override timestamps per device
let lastOverrideAt = {
  fan: 0,
  light: 0,
  ac: 0,
};

// Utility to create a merged payload to broadcast
function getMergedPayload() {
  return {
    ...latestSensors,
    // server device states override sensor-sent device values
    fan: deviceStates.fan,
    light: deviceStates.light,
    ac: deviceStates.ac,
  };
}

// Broadcast merged payload to all connected dashboards
function broadcastMerged() {
  const payload = JSON.stringify(getMergedPayload());
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) client.send(payload);
  });
}

wss.on("connection", (ws) => {
  console.log("🌐 New client connected");

  // Immediately send latest merged snapshot
  if (Object.keys(latestSensors).length > 0) {
    ws.send(JSON.stringify(getMergedPayload()));
  }

  ws.on("message", (message) => {
    // Expecting JSON
    let parsed;
    try {
      parsed = JSON.parse(message.toString());
    } catch (err) {
      console.error("❌ Invalid JSON:", message.toString());
      return;
    }

    // -------------------------
    // Case A: Sensor message from ESP32 (has temperature field)
    // -------------------------
    if (parsed.temperature !== undefined) {
      // Identify this connection as ESP32
      esp32Client = ws;
      // Update sensor snapshot (only sensor fields)
      // Keep deviceStates on server unless their override TTL expired
      latestSensors = { ...latestSensors, ...parsed };

      const now = Date.now();

      // If no recent dashboard override for device, accept ESP32 reported device state
      ["fan", "light", "ac"].forEach((dev) => {
        const overrideAgo = now - (lastOverrideAt[dev] || 0);
        if (overrideAgo > OVERRIDE_TTL) {
          // Accept ESP32's reported value if provided; else leave current server state
          if (parsed[dev] !== undefined) {
            deviceStates[dev] = parsed[dev];
          }
        } else {
          // Keep server deviceStates (dashboard recently commanded it)
        }
      });

      // Broadcast merged payload to dashboards
      broadcastMerged();
      return;
    }

    // -------------------------
    // Case B: Command from dashboard (type === 'command')
    // -------------------------
    if (parsed.type === "command" && parsed.device) {
      const { device, state } = parsed;

      if (["fan", "light", "ac"].includes(device) && (state === 0 || state === 1)) {
        // Update server authoritative state + set override timestamp
        deviceStates[device] = state;
        lastOverrideAt[device] = Date.now();

        // Immediately broadcast merged state to dashboards (so UI updates instantly)
        broadcastMerged();

        // Forward the command to ESP32 (if connected)
        if (esp32Client && esp32Client.readyState === WebSocket.OPEN) {
          try {
            esp32Client.send(JSON.stringify(parsed));
            console.log("➡️ Forwarded command to ESP32:", parsed);
          } catch (e) {
            console.error("Failed to forward to ESP32:", e);
          }
        } else {
          console.log("⚠️ No ESP32 connected — command saved on server state");
        }
      }
      return;
    }

    // -------------------------
    // Other message types (ignore or log)
    // -------------------------
    console.log("ℹ️ Received unknown message type:", parsed);
  });

  ws.on("close", () => {
    console.log("❌ Client disconnected");
    if (ws === esp32Client) {
      esp32Client = null;
      console.log("🚫 ESP32 disconnected — simulator will run if enabled");
    }
  });
});

/* ==== Simulator: Send fake data every 5s IF ESP32 not connected ==== */
setInterval(() => {
  if (!esp32Client) {
    latestSensors = {
      temperature: Math.floor(Math.random() * 10 + 20),
      humidity: Math.floor(Math.random() * 30 + 40),
      ldr: Math.floor(Math.random() * 4000),
      occupied: Math.random() > 0.5,
      peopleCount: Math.floor(Math.random() * 5),
    };
    // Broadcast merged (server deviceStates win)
    broadcastMerged();
    console.log("⚡ Sent simulated merged data:", getMergedPayload());
  }
}, 5000);
```

# ⚡AVI C++ CODE (UPDATE YET) 9/10/2025

```
#include <WiFi.h>
#include <WebSocketsClient.h>
#include <DHT.h>
#include <LiquidCrystal_I2C.h>

// ==== Wi-Fi Settings ====
const char* ssid = "SLIIT-STD";        // Wi-Fi SSID
const char* password = "Hirusha200519102433";         // Wi-Fi password

// ==== WebSocket Settings ====
const char* ws_server = "172.28.25.157";     // Node.js server IP
const uint16_t ws_port = 5000;               // Must match Node.js server port
WebSocketsClient webSocket;

// ==== Pins ====
#define IR1_PIN 32
#define IR2_PIN 33
#define LDR_PIN 34
#define FAN_PIN 25
#define LIGHT_PIN 26
#define RELAY_AC_PIN 27

// ==== DHT22 setup ====
#define DHTPIN 4
#define DHTTYPE DHT22
DHT dht(DHTPIN, DHTTYPE);

// ==== LCD ====
LiquidCrystal_I2C lcd(0x27, 16, 2);

// ==== Variables ====
bool roomOccupied = false;
int peopleCount = 0;   // optional people counter
int entrancePrev = LOW;
int exitPrev = LOW;

// ==== WebSocket Event ====
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
  }
  case WStype_TEXT:
  Serial.printf("Received: %s\n", payload);

  // Parse command
  if (strstr((char*)payload, "command")) {
    String msg = String((char*)payload);
    if (msg.indexOf("fan") > 0) {
      int state = msg.indexOf("1") > 0 ? HIGH : LOW;
      digitalWrite(FAN_PIN, state);
    }
    if (msg.indexOf("light") > 0) {
      int state = msg.indexOf("1") > 0 ? HIGH : LOW;
      digitalWrite(LIGHT_PIN, state);
    }
    if (msg.indexOf("ac") > 0) {
      int state = msg.indexOf("1") > 0 ? HIGH : LOW;
      digitalWrite(RELAY_AC_PIN, state);
    }
  }
  break;

}

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

  // ==== WiFi ====
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi...");
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println("\nWiFi connected!");
  Serial.println(WiFi.localIP());

  // ==== WebSocket ====
  webSocket.begin(ws_server, ws_port, "/");
  webSocket.onEvent(webSocketEvent);
}

void loop() {
  webSocket.loop(); // Keep WebSocket alive

  // --- Occupancy (simple detection from IRs) ---
  bool ir1 = digitalRead(IR1_PIN);
  bool ir2 = digitalRead(IR2_PIN);
  roomOccupied = (ir1 == HIGH || ir2 == HIGH);

  // Optional: people counting logic
  if (ir1 == HIGH && entrancePrev == LOW) {
    peopleCount++;
  }
  entrancePrev = ir1;
  if (ir2 == HIGH && exitPrev == LOW) {
    if (peopleCount > 0) peopleCount--;
  }
  exitPrev = ir2;

  // --- Sensor readings ---
  int ldrValue = analogRead(LDR_PIN);
  float temp = dht.readTemperature();
  float hum = dht.readHumidity();

  // --- Actuators ---
  if (roomOccupied) {
    if (ldrValue < 2000) digitalWrite(LIGHT_PIN, HIGH);
    else digitalWrite(LIGHT_PIN, LOW);

    if (temp > 24 && temp < 30) digitalWrite(FAN_PIN, HIGH);
    else digitalWrite(FAN_PIN, LOW);

    if (temp >= 30) {
      digitalWrite(RELAY_AC_PIN, HIGH);
      lcd.setCursor(0,0);
      lcd.print("AC: ON        ");
    } else {
      digitalWrite(RELAY_AC_PIN, LOW);
      lcd.setCursor(0,0);
      lcd.print("AC: OFF       ");
    }
  } else {
    digitalWrite(LIGHT_PIN, LOW);
    digitalWrite(FAN_PIN, LOW);
    digitalWrite(RELAY_AC_PIN, LOW);
    lcd.setCursor(0,0);
    lcd.print("Room Empty    ");
  }

  // --- Send JSON to WebSocket every 5s ---
  static unsigned long lastSend = 0;
  if (millis() - lastSend > 5000) {
    lastSend = millis();

    String jsonData = "{";
    jsonData += "\"peopleCount\":" + String(peopleCount) + ",";
    jsonData += "\"ldr\":" + String(ldrValue) + ",";
    jsonData += "\"temperature\":" + String(temp) + ",";
    jsonData += "\"humidity\":" + String(hum) + ",";
    jsonData += "\"light\":" + String(digitalRead(LIGHT_PIN)) + ",";
    jsonData += "\"fan\":" + String(digitalRead(FAN_PIN)) + ",";
    jsonData += "\"ac\":" + String(digitalRead(RELAY_AC_PIN));
    jsonData += "}";

    webSocket.sendTXT(jsonData);
    Serial.println("Sent: " + jsonData);
  }

  delay(500); // small delay for stability
}
```
