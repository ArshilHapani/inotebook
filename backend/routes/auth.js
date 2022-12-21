const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');


// Create a user using: POST "/api/auth/createuser". Doesn't require authentication and login
router.post('/createuser', [
    body('name', 'minimum name length require *3 char').isLength({ min: 3 }),
    body('email', 'Enter a valid email format').isEmail(),
    body('password', 'minimum password length require *7 char max *20 char').isLength({ min: 7, max: 20 })
],
    async (req, res) => {

        //If there are errors then return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //Check whether the user's email exists already
        try {
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                return res.status(400).json({ error: "User already exists" });
            }
            user = await User.create({
                name: req.body.name,
                password: req.body.password,
                email: req.body.email,
            })
            res.send(user);
        } catch (error) {
            res.status(500).send({
                message: "Something went wrong",
                errorMessage: error.message,
            })
        }

    })
module.exports = router;