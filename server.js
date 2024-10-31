const WebSocket = require('ws');
const http = require('http');
const express = require('express');
const app = express();

// Serve static files (optional)
app.use(express.static('public'));

// Create HTTP server and WebSocket server
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// WebSocket connection handling
wss.on('connection', (ws) => {
    console.log('A new client connected!');

    // Send a welcome message
    ws.send('Welcome to the WebSocket server!');

    // Listen for messages from clients
    ws.on('message', (message) => {
        console.log(`Received: ${message}`);
        // Broadcast message to all connected clients
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    // Handle client disconnection
    ws.on('close', () => {
        console.log('A client disconnected');
    });
});

// Start server
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
