const express = require('express');
const router = express.Router();
const User = require('../models/User')

// Create a user using: POST "/apu/auth". Doesn't require authentication
router.post('/', (req, res) => {
    console.log(req.body);
    const user = User(req.body);
    user.save();
    res.send(req.body)
})
module.exports = router;