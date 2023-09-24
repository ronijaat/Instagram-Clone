const jwt = require('jsonwebtoken');
require("dotenv").config();

const User = require('../models/model');
const KEY = process.env.KEY;

module.exports  = (req,res,next)=>{
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(400).json({error: "You must have login"})
    }
    const token = authorization.replace("Bearer ","");
    jwt.verify(token,KEY,async(err,payload)=>{
        if(err){
            return res.status(400).json({error: "You must have login!"})
        }
        const {_id} = payload;
        await User.findById(_id)
            .then(data=>{
                req.user = data;
                next();
            })
    })
}