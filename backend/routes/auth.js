const express = require('express');
const router = express.Router();
const User = require('../models/Users');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_secret = "123456789";

//  Route 1:                             create a user using the POST '/api/auth/createuser' no login required

router.post('/createuser', async (req, res) => {
    let success = true;
    // check whether the user with a email already exists in our database
    let user = await User.findOne({ email: req.body.email })
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
    // Making a jsonweb token upon successful signup and return it
    const data = user.id;

    const authtoken = jwt.sign(data, JWT_secret);
    res.status(200).json({ success, authtoken });

})

//  Route 2:                            authenticate a user using the POST '/api/auth/login' no login required

router.post('/login', async (req, res) => {
    let success = true
    const { email, password } = req.body;
    let user = await User.findOne({ email })
    console.log(user)
    if (!user) {
        return res.status(400).json({ error: "try to enter a email used for during the signup" })
    }
    else {
        let comparepassword = user.password.localeCompare(password);
        if (comparepassword != 0) {
            return res.status(400).json({ error: "try to enter a correct password" })
        }
    }
    const data = user.id;

    const authtoken = jwt.sign(data, JWT_secret);
    res.status(200).json({ success,authtoken });
})

//  Route 3:                          getting details of logged in  user using the POST '/api/auth/getuser' login required

router.post('/getuser',fetchuser, async(req,res)=>{
    const userid=req.id;
    const user = await User.findById(userid);
    res.send(user);
})



module.exports = router;