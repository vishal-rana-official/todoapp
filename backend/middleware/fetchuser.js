var jwt = require('jsonwebtoken');

const JWT_secret = "123456789";

const fetchuser = (req, res, next) => {
    // get the user from the jwt token and add id to request object;

    const token = req.header('auth-token')
    if (!token) {
        res.status(401).send({ error: "please authenticate using a valid token" })
    }
    const data = jwt.verify(token, JWT_secret);
    req.id = data;
    next();
}

module.exports = fetchuser;