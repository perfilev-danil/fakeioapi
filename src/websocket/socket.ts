import { Server } from "socket.io"; // Import Socket.IO Server class

// Variable to hold the Socket.IO server instance
let io: Server | null = null;

/**
 * Initialize Socket.IO server and attach it to an existing HTTP server
 * @param server - HTTP server instance created by Node.js
 * @returns Socket.IO server instance
 */
export const initSocket = (server: any) => {
  // Create a new Socket.IO server and attach it to the HTTP server
  // CORS is set to allow any origin (useful for development)
  io = new Server(server, {
    cors: { origin: "*" },
  });

  // Listen for new client connections
  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id); // Log the connected client ID

    // Listen for client disconnection
    socket.on("disconnect", () =>
      console.log("Client disconnected:", socket.id),
    );
  });

  // Return the initialized Socket.IO server
  return io;
};

/**
 * Get the initialized Socket.IO server instance
 * Throws an error if the server has not been initialized yet
 * @returns Socket.IO server instance
 */
export const getIO = (): Server => {
  if (!io) throw new Error("Socket.IO not initialized"); // Ensure Socket.IO is initialized
  return io; // Return the server instance
};
