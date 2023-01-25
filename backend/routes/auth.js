const express = require('express')
const router = express.Router();
const User = require('../models/Users')
var jwt = require('jsonwebtoken');

const JWT_secret = "123456789";

//                              create a user using the POST '/api/auth/createuser' no login required

router.post('/createuser', async (req, res) => {
    // check whether the user with a email already exists in our database
    let user =await User.findOne({ email: req.body.email })
    if (user) {
        return res.status(400).json({ error: "sorry a user with this email already exists" })
    }
    else {
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
    }
    // Making a jsonweb token upon successful signup 
    const data=user.id;

    const authtoken= jwt.sign(data,JWT_secret);
    console.log(data)
    res.status(200).json({authtoken});

})


module.exports = router;