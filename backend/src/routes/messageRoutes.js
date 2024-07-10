const express = require('express');
const { getMessages } = require('../controllers/messageController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.use(authenticate);

router.get('/', getMessages);



module.exports = router;