require('dotenv').config();
const express = require('express');
const http = require('http');
const connectDB = require('./src/config/database');
const authRoutes = require('./src/routes/authRoutes');
const messageRoutes = require('./src/routes/messageRoutes');
const setupWebSocket = require('./src/websocket/chatHandler');
const errorHandler = require('./src/middleware/errorHandler');
const cors = require('cors');
const app = express();
const server = http.createServer(app);

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

setupWebSocket(server);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));