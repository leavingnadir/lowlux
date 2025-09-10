/*const express = require("express");
const { WebSocketServer } = require("ws");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = 5000;

const server = app.listen(PORT, () =>
  console.log(`HTTP & WS server running on port ${PORT}`)
);

const wss = new WebSocketServer({ server });

wss.on("connection", (ws, req) => {
  const clientIP = req && req.socket ? req.socket.remoteAddress : 'unknown';
  console.log(`New WebSocket client connected from ${clientIP}`);

  ws.on("message", (message) => {
    console.log("Received from client:", message.toString());
    try {
      const parsed = JSON.parse(message.toString());
      console.log("Parsed JSON:", parsed);
    } catch (e) {
      console.log("Message is not valid JSON");
    }

    // Broadcast data to all React clients
    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(message.toString());
      }
    });
  });

  ws.on("close", () => {
    console.log(`WebSocket client from ${clientIP} disconnected`);
  });

  ws.on("error", (err) => {
  console.error(`WebSocket error from ${clientIP}:`, err);
  });
});
*/

const express = require("express");
const { WebSocketServer } = require("ws");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = 5000;

const server = app.listen(PORT, () =>
  console.log(`HTTP & WS server running on port ${PORT}`)
);

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("New WebSocket client connected!");

  ws.on("message", (message) => {
    console.log("Received from client:", message.toString());
  });
});

// ==== Simulate ESP32 data every 5 seconds ====
setInterval(() => {
  const fake = {
    temperature: 22 + Math.floor(Math.random() * 6),
    humidity: 50 + Math.floor(Math.random() * 10),
    ldr: Math.floor(Math.random() * 100),
    peopleCount: Math.floor(Math.random() * 5),
  };
  broadcast(fake);
}, 3000);
