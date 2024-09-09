import { Server as SocketIOServer } from "socket.io";
import dotenv from "dotenv";
import Message from "./models/MessagesModel.js";
dotenv.config();

const setupSocket = (server) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: process.env.ORIGIN,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  const userSocketMap = new Map();

  const disconnect = (socket) => {
    console.log(`client disconnected: ${socket.id}`);
    for (const [userId, socketId] of userSocketMap.entries()) {
      if (socketId === socket.id) {
        userSocketMap.delete(userId);
        break;
      }
    }
  };

  const sendMessage = async (message) => {
    
      const senderSocketId = userSocketMap.get(message.sender);
      const recipientSocketId = userSocketMap.get(message.recipient);

      const createMessage = await Message.create(message);

      const messageData = await Message.findById(createMessage._id)
        .populate("sender", "id email name image color")
        .populate("recipient", "id email name image color");

      
      if (recipientSocketId) {
        io.to(recipientSocketId).emit("recieveMessage", messageData);
      }

      
      if (senderSocketId) {
        io.to(senderSocketId).emit("recieveMessage", messageData);
      }    
  };

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;

    if (userId) {
      userSocketMap.set(userId, socket.id);
      console.log(`user Connected: ${userId} with ${socket.id}`);
    } else {
      console.log("userId not provided during connection");
    }

    
    socket.on("sendMessage", (message, callback) => sendMessage(message, callback)
    //io.emit("newMessage", message);
  );

    
    
    socket.on("disconnect", () => disconnect(socket));
  });
};

export default setupSocket;

