const express = require('express')
const router = express.Router();

router.get('/no',(req,res)=>{
    res.send('vishal');
})


module.exports= router;