const jwt = require('jsonwebtoken');
const express =require('express');
require('dotenv').config();
const router = express.Router();

router.post('/login', (req, res)=>{
    console.log('Admin Login Route');
    const username = req.body.username;
    const password = req.body.password;
    if(username===process.env.ADMIN_USR){
        if(password===process.env.ADMIN_PASS){
            const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn:'30m' });
            res.json({
                message: 'User Authentication Successful',
                authenticated: true,
                token: token
            });
        }else{
            res.json({
                message: 'User Authentication Failed',
                authenticated: false,
                error: 'Incorrect Password'
            });
        }
    }else{
        res.json({
            message: 'User Authentication Failed',
            authenticated: false,
            error: 'Incorrect Credentials'
        });
    }
});

router.post('/verify', (req, res)=>{
    const token=req.body.token;
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
        if(!err){
            res.status(200).json({
                authStatus: true
            });
        }else{
            res.status(200).json({
                authStatus: false
            })
        }
    });
})

module.exports = router;