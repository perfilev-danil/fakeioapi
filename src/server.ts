import "dotenv/config"; // Load environment variables from .env
import express from "express"; // Import Express to handle HTTP requests
import http from "http"; // Import Node.js HTTP module to create a server (needed for WebSocket)
import { connectDB } from "./config/db.ts"; // Database connection using Prisma
import authRoutes from "./routes/authRoutes.ts"; // REST routes for authentication (register, login)
import userRoutes from "./routes/userRoutes.ts";
import coinRoutes from "./routes/coinRoutes.ts";
import metricRoutes from "./routes/metricRoutes.ts"; // REST routes for metrics (history, filters)
import holdingRoutes from "./routes/holdingRoutes.ts";
import { initSocket } from "./websocket/socket.ts"; // Initialize WebSocket server (Socket.IO)
import { startMetricStream } from "./websocket/metricStream.ts"; // Automatic metric generation and streaming

// Connect to the database
connectDB();

const app = express(); // Create an Express application

// Middleware to parse JSON and form-data
app.use(express.json()); // Allows the server to read JSON from request body
app.use(express.urlencoded({ extended: true })); // Allows the server to read HTML form data

// Attach REST routes
app.use("/auth", authRoutes); // All requests starting with /auth will be handled by authRoutes
app.use("/users", userRoutes);
app.use("/metrics", metricRoutes); // All requests starting with /metrics will be handled by metricRoutes
app.use("/coins", coinRoutes);
app.use("/holdings", holdingRoutes);

// Create an HTTP server (required for WebSocket)
const server = http.createServer(app);

// Initialize Socket.IO and attach it to the server
const io = initSocket(server);

// Start automatic metric stream: generates metrics and emits them to all connected clients
startMetricStream(io);

// Set the server port (from .env or default to 3000)
const PORT = process.env.PORT || 3000;

// Start the server and listen for incoming connections
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
