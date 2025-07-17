import { Server, Socket } from "socket.io";

interface IUser {
  userId: string;
  socketId: string;
}

let users: IUser[] = [];

const addUser = (userId: string, socketId: string) => {
  if (!users.some((user) => user.userId === userId)) {
    users.push({ userId, socketId });
  }
};

const removeUser = (socketId: string) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId: string) =>
  users.find((user) => user.userId === userId);

const socketServer = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("🟢 New socket connected:", socket.id);

    socket.on("addUser", (userId: string) => {
      addUser(userId, socket.id);
      io.emit("getUsers", users);
    });

    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
      const user = getUser(receiverId);
      if (user) {
        io.to(user.socketId).emit("getMessage", { senderId, text });
      }
    });

    socket.on("disconnect", () => {
      console.log("🔴 Socket disconnected:", socket.id);
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });
};

export default socketServer;
