import { Server as SocketIOServer } from "socket.io";
import messageModel from "./models/messageModel.js";

const setupSocket = (server) => {
    const io = new SocketIOServer(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
            credentials: true,
        }
    });

    const userSocketMap = new Map();

    const disconnect = (socket) => {
        console.log(`Client Disconnected: ${socket.id}`);
        for (const [userId, socketId] of userSocketMap.entries()) {
            if (socketId === socket.id) {
                userSocketMap.delete(userId);
                break;
            }
        }
    };

    const sendMessage = async(message) => {
        const senderSocketId = userSocketMap.get(message.sender)
        const recipientSocketId = userSocketMap.get(message.recipient)

        const createMessage = await messageModel.create(message)
        console.log("createMessage+++++++", createMessage);

        const messageData = await messageModel.findById(createMessage._id)
        .populate("sender","id email firstname lastname image color")
        .populate("recipient","id email firstname lastname image color")

        console.log("messageData:::::",messageData);

        if(recipientSocketId){
            io.to(recipientSocketId).emit("recieveMessage",messageData)
        }
        if(senderSocketId){
            io.to(senderSocketId).emit("recieveMessage",messageData)
        }
    }

    io.on("connection", (socket) => {
        const userId = socket.handshake.query.userId;

        if (userId) {
            userSocketMap.set(userId, socket.id);
            console.log(`User Connected: ${userId}  with socket ID: ${socket.id}`);
        } else {
            console.log("User ID not provided during connection.");
        }

        socket.on("sendMessage",sendMessage)
        socket.on("disconnect", () => disconnect(socket));
    });
};

export default setupSocket;
