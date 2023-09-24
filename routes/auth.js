const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require("dotenv").config();

const requireMiddlware = require('../middlewares/requireLogin');
const User = require('../models/model');

const router = express.Router();


router.post('/signup',async(req, res) => {
    try {
        const { name, userName, email, password } = req.body;
        if (!name, !userName, !email, !password) {
            return res.status(400).json({ error: "please add all fields" })
        }

        const exits = await User.findOne({ $or: [{ email: email }, { userName: userName }] });
        if (exits) {
            return res.status(400).json({ error: "user already exists" });
        }

        bcrypt.hash(password, 12).then(async(hashedPassword) => {
            const user = new User({ name, userName, email, password:hashedPassword });

            await user.save()
                .then(data => res.status(200).json({ message: "data saved successfully" }));
        })


    } catch (error) {
        res.status(401).json({ message: "error in user data" });
    }
})

router.post('/signin',async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({error:"please add email and password"});
        }

        const user = await User.findOne({email:email});
        if(!user){
            return res.status(400).json({error:"user doesn't exists"});
        }
        bcrypt.compare(password,user.password)
            .then(match=>{
                if(match){
                //    return res.status(200).json({message:"Sign In Successfully"})
                const token = jwt.sign({_id:user._id},process.env.KEY);
                const {_id,name,email,userName,followers,following} = user;
                return res.status(200).json({token,user:{_id,name,email,userName,followers,following}});
                }
                else{
                    return res.status(400).json({error:"Invalid Password"})
                }
            })
            .catch(err=>console.log(err));


    }catch (error) {
        res.status(401).json({ message: "error in signin" });
    }
})

module.exports = router;