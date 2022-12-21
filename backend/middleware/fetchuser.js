const jwt = require('jsonwebtoken');
const JWT_SECRET = "ArshilIsLegend";
//Middleware function
const fetchuser = (req, res, next) => {
    //Get the user from the jwt authentication token and add id to the request object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Authenticate using valid token" });
    }
    try {
        const tokenStringData = jwt.verify(token, JWT_SECRET);
        req.user = tokenStringData.user
        next();
    } catch (error) {
        res.status(500).send({
            message: "invalid authentication token",
        })
        console.log({ errorMessage: error.message })
    }

}

module.exports = fetchuser;