//auth controler to register a new user and login

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ApiError = require('../utils/apiError');
const asyncHandler = require('../utils/asyncHandler');

exports.register = asyncHandler(async (req, res) => {
  const { username, password, email } = req.body;
  const user = new User({ username, password, email });
  await user.save();
  res.status(201).json({ message: 'User registered successfully' });
});

exports.login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, 'Invalid credentials');
  }
  const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET);
  res.json({ token });
});