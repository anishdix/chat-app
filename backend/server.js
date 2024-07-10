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
//connect to db
connectDB();
//cors policy
app.use(cors());

//parse json
app.use(express.json());
//all auth routes
app.use('/api/auth', authRoutes);

//all message routes
app.use('/api/messages', messageRoutes);

setupWebSocket(server);

//error handling middleware
app.use(errorHandler);

//start server on port from .env file or 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));