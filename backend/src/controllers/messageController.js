const Message = require('../models/Message');
const asyncHandler = require('../utils/asyncHandler');

exports.getMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find().sort({ timestamp: -1 }).limit(50);
  res.json(messages);
});

