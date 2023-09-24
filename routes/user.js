const express = require("express")

const Post = require('../models/posts');
const User = require('../models/model');
const requireLogin = require('../middlewares/requireLogin');

const userRouter = express.Router();

userRouter.get('/user/:id', requireLogin, async (req, res) => {
    await User.findOne({ _id: req.params.id })
        .populate("followers", "_id")
        .select("-password")
        .then(async user => {
            await Post.find({ postedBy: req.params.id })
                .populate("postedBy", "_id")
                .then(post => {
                    return res.status(200).json({ user, post })
                })
                .catch(err => {
                    return res.status(400).json({ error: err })
                })
        }).catch(err => {
            return res.status(400).json({ error: err })
        })

})

userRouter.put('/follow', requireLogin, async (req, res) => {
    const user = await User.findByIdAndUpdate(req.body.followId, {
        $push: { followers: req.user._id }
    }, {
        new: true
    });

    if (user) {
        User.findByIdAndUpdate(req.user._id, {
            $push: { following: req.body.followId }
        }, {
            new: true
        }).then(result => {
            return res.status(200).json(result)
        }).catch(error => {
            return res.status(400).json(error)
        })
    } else {
        return res.status(400).json({ error: "user not found" })
    }

})

userRouter.put('/unfollow', requireLogin, async (req, res) => {
    const user = await User.findByIdAndUpdate(req.body.followId, {
        $pull: { followers: req.user._id }
    }, {
        new: true
    });

    if (user) {
        User.findByIdAndUpdate(req.user._id, {
            $pull: { following: req.body.followId }
        }, {
            new: true
        }).then(result => {
            return res.status(200).json(result)
        }).catch(error => {
            return res.status(400).json(error)
        })
    } else {
        return res.status(400).json({ error: "user not found" })
    }

})

//uplaod profile pic
userRouter.put('/uploadProfilePic',requireLogin,async(req,res)=>{
    await User.findByIdAndUpdate(req.user._id,{
        $set : {Photo : req.body.pic}
    },{
        new : true
    }).then(data=>{
        return res.status(200).json(data);
    })
    .catch(error=>{
        return res.status(400).json(error);
    })
})

module.exports = userRouter;