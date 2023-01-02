const express = require('express');
const router = express.Router();
require('dotenv').config();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
let success;
const JWT_SECRET = process.env.JWT_SECRET_KEY; //Secret variable use to generate and verify token



//! ROUTE-1
// Create a user using: POST "/api/auth/createuser". Doesn't require authentication and login

router.post('/createuser', [
    body('name', 'minimum name length require *3 char').isLength({ min: 3 }),
    body('email', 'Enter a valid email format').isEmail(),
    body('password', 'minimum password length require *7 char max *20 char').isLength({ min: 7 })
],
    async (req, res) => {

        //If there are errors in validation controls then return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {

            //Check whether the user's email exists already

            let user = await User.findOne({ email: req.body.email })
            if (user) {
                success = false;
                return res.status(400).json({ success, error: "User already exists" });
            }

            //Generating Encrypted Password

            const salt = await bcrypt.genSalt(10);
            const encPwd = await bcrypt.hash(req.body.password, salt);
            //Creates a new user
            user = await User.create({
                name: req.body.name,
                password: encPwd,
                email: req.body.email,
            })
            // Defining a jwt token and sendin it to server
            const data = {
                user: {
                    id: user.id,
                }
            }

            const authToken = jwt.sign(data, JWT_SECRET);
            success = true;
            res.send({ success, authToken })

        } catch (error) {
            success = false
            res.status(500).send({
                success,
                message: "internal server error",
            })
            console.log({ errorMessage: error.message })
        }

    })




//! ROUTE-2
// Authenticate a user using: POST "/api/auth/login". no login required
router.post('/login', [
    body('email', 'Enter a valid email format').isEmail(),
    body('password', 'Password cant be blank').exists(),
],
    async (req, res) => {
        //If there are errors then return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            success = false;
            return res.status(400).json({ success, errors: errors.array() });
        }
        //Destructuring the email and password from the req.body
        const { email, password } = req.body;
        try {
            //Verifying user's email
            let user = await User.findOne({ email })
            if (!user) {
                success = false;
                return res.status(400).json({ success, "error": "enter a valid email address or password" });
            }
            //Verifying user's password
            const passwordCompare = bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                success = false;
                return res.status(400).json({ success, "error": "enter a valid email address or password" });
            }
            // Sending jwt to server
            const data = {
                user: {
                    id: user.id,
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            success = true;
            res.send({ success, authToken })
        } catch (error) {
            success = false
            res.status(500).send({
                success,
                message: "internal server error",
            })
            console.log({ errorMessage: error.message })
        }

    })




//! ROUTE-3 
// Get logged in user details using: POST "/api/auth/getuser".  login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password'); // here .select method is used to select every field except password
        success = true;
        res.send({ success, user })
    } catch (error) {
        success = false;
        res.status(401).send({
            success,
            message: "internal server error",
        })
        console.log({ errorMessage: error.message })
    }
})
module.exports = router;