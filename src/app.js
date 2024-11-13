import { Server } from "socket.io";
import { createServer } from "http";
import express from "express";
import dgram from "dgram";

class UdpClient {
  static instance;
    client;
    serviceHost = "10.0.0.13";
    servicePort = 8080;

  constructor() {
    this.client = dgram.createSocket("udp4");
  }
  static getInstance() {
    if (!this.instance) {
      this.instance = new UdpClient();
    }
    return this.instance;
    }
    
    sendUdpMessageToService(message) {
        this.client.send(message, 0, message.length, this.servicePort, this.serviceHost, (err) => {
            if (err) {
              console.error(`UDP message send error: ${err.message}`);
            } else {
              console.log("UDP message sent to server");
            }
        })
    }
}

const port = process.env.PORT || 8080;
const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer, {
    perMessageDeflate: false,
    cors: { origin: '*' },
  });

io.on("connection", (socket) => {
  console.log(`New client connected: ${socket.id}`);

  socket.on("message", (message) => {
    console.log(`Received message: ${message}`);
      const udpclient = UdpClient.getInstance();
      udpclient.sendUdpMessageToService(message);
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

httpServer.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
