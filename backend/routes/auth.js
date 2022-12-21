const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "ArshilIsLegend" //Secret variable use to generate and varify token
//! ROUTE-1
// Create a user using: POST "/api/auth/createuser". Doesn't require authentication and login
router.post('/createuser', [
    body('name', 'minimum name length require *3 char').isLength({ min: 3 }),
    body('email', 'Enter a valid email format').isEmail(),
    body('password', 'minimum password length require *7 char max *20 char').isLength({ min: 7, max: 20 })
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
                return res.status(400).json({ error: "User already exists" });
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
            // Sending jwt to server
            const data = {
                user: {
                    id: user.id,
                }
            }


            const authToken = jwt.sign(data, JWT_SECRET);
            res.send({ authToken })
            // res.send(user);

        } catch (error) {
            res.status(500).send({
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
            return res.status(400).json({ errors: errors.array() });
        }
        //Destructuring the email and password from the req.body
        const { email, password } = req.body;
        try {
            //Verifying user's email
            let user = await User.findOne({ email })
            if (!user) {
                return res.status(400).json({ "error": "enter a valid email address or password" });
            }
            //Verifying user's password
            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(400).json({ "error": "enter a valid email address or password" });
            }
            // Sending jwt to server
            const data = {
                user: {
                    id: user.id,
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            res.send({ authToken })
        } catch (error) {
            res.status(500).send({
                message: "internal server error",
            })
            console.log({ errorMessage: error.message })
        }

    })


//! ROUTE-3
// Get logged in user details using: POST "/api/auth/getuser".  login required
router.post('/getuser',fetchuser,async (req, res) => {
        try {
            const userId = req.user.id;
            const user = await User.findById(userId).select('-password'); // here .select method is used to select every field except password
            res.send({user})
        } catch (error) {
            res.status(401).send({
                message: "internal server error",
            })
            console.log({ errorMessage: error.message })
        }
    })
module.exports = router;