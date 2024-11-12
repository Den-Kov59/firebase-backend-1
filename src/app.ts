import { Server, Socket } from "socket.io";
import { createServer } from "http";
import express from "express";
import { UdpClient } from "./udp_client";

const port = 3002;
const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket: Socket) => {
  console.log(`New client connected: ${socket.id}`);

  // Example: Handling a custom event from client
  socket.on("message", (message: string) => {
    console.log(`Received message: ${message}`);
      const udpclient = UdpClient.getInstance();
      udpclient.sendUdpMessageToService(message);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

app.listen(port);
