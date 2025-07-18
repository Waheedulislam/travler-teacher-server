import http from "http";
import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";
import { Server as SocketIOServer } from "socket.io";
import socketServer from "./socket";

let server: http.Server | null = null;

async function connectToDatabase() {
  try {
    await mongoose.connect(config.db_url as string);
    console.log("🛢 Database connected successfully");
  } catch (err) {
    console.error("❌ Failed to connect to database:", err);
    process.exit(1);
  }
}

function gracefulShutdown(signal: string) {
  console.log(`Received ${signal}. Closing server...`);
  if (server) {
    server.close(() => {
      console.log("✅ Server closed gracefully");
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
}

async function bootstrap() {
  try {
    await connectToDatabase();

    server = http.createServer(app);

    const io = new SocketIOServer(server, {
      cors: {
        origin: [
          "https://www.traveltoyourteacher.com",
          "http://localhost:3000",
        ],
        methods: ["GET", "POST"],
        credentials: true,
      },
      transports: ["websocket", "polling"],
    });

    socketServer(io);

    server.listen(config.port, () => {
      console.log(`🚀 Server running on http://localhost:${config.port}`);
    });

    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));

    process.on("uncaughtException", (error) => {
      console.error("Uncaught Exception:", error);
      gracefulShutdown("uncaughtException");
    });

    process.on("unhandledRejection", (error) => {
      console.error("Unhandled Rejection:", error);
      gracefulShutdown("unhandledRejection");
    });
  } catch (error) {
    console.error("❌ Error during bootstrap:", error);
    process.exit(1);
  }
}

bootstrap();
