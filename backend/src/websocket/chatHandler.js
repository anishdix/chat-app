//websocket api connection,send message

const WebSocket = require('ws');
const jwt = require('jsonwebtoken');
const Message = require('../models/Message');

const setupWebSocket = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws, req) => {
    const token = req.url.split('=')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        ws.close();
        return;
      }
      ws.username = decoded.username;

      ws.on('message', async (message) => {
        try {
          const data = JSON.parse(message);
          const newMessage = new Message({
            sender: ws.username,
            content: data.content,
          });
          await newMessage.save();

          // Broadcast the message to all connected clients
          const broadcastMessage = JSON.stringify({
            type: 'message',
            data: newMessage
          });

          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(broadcastMessage);
            }
          });
        } catch (error) {
          console.error('Error processing message:', error);
          ws.send(JSON.stringify({ type: 'error', message: 'Error processing message' }));
        }
      });

      // Send a welcome message
      ws.send(JSON.stringify({ type: 'info', message: 'Connected to chat server' }));
    });
  });
};

module.exports = setupWebSocket;