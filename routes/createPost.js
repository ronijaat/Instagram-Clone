const express = require("express");
require("dotenv").config();

const requireLogin = require('../middlewares/requireLogin');
const Post = require('../models/posts');

const Postrouter = express.Router();

Postrouter.delete("/deletePost/:postId",requireLogin,async(req,res)=>{
    await Post.findOne({_id : req.params.postId})
        .populate("postedBy","_id")
        .then(async(post)=>{
            if(!post){
                return res.status(400).json({error : "not found"})
            }
            if(post.postedBy._id.toString() == req.user._id.toString()){
                await Post.deleteOne({ _id: req.params.postId })
                    .then(result=>{
                        return res.status(200).json({message : "Successfully deleted"})
                    })
            }
            else{
                return res.status(400).json({error : "not authorized user"})
            }
        })
})

Postrouter.put('/comment', requireLogin, async (req, res) => {
    await Post.findByIdAndUpdate(req.body.postId, {
        $push: { comments: { comment: req.body.comment, postedBy: req.user._id } }
    }, {
        new: true
    })
        .populate("comments.postedBy", "_id name Photo")
        .populate("postedBy","_id name Photo")
        .then((result) => {
            return res.status(200).json(result);
        }).catch(err => res.status(400).json({ error: err }))
})

Postrouter.put('/like', requireLogin, async (req, res) => {
    // console.log("postId", req.body.postId);
    await Post.findByIdAndUpdate(req.body.postId, {
        $push: { likes: req.user._id }
    }, {
        new: true
    }).populate("postedBy","_id name Photo")
    .then((result) => {
        return res.status(200).json(result);
    }).catch(err => res.status(400).json({ error: err }))
})

Postrouter.put('/unlike', requireLogin, async (req, res) => {
    await Post.findByIdAndUpdate(req.body.postId, {
        $pull: { likes: req.user._id }
    }, {
        new: true
    }).populate("postedBy","_id name Photo")
    .then((result) => {
        return res.status(200).json(result);
    }).catch(err => res.status(400).json({ error: err }))
})

Postrouter.get('/mypost', requireLogin, async (req, res) => {
    await Post.find({ postedBy: req.user._id })
        .populate("postedBy", "_id name")
        .populate("comments.postedBy","_id name")
        .sort("-createdAt")
        .then(posts => {
            res.status(200).json(posts)
        })
})

Postrouter.get("/allposts", requireLogin, async (req, res) => {
    await Post.find({})
        .populate("postedBy", "_id name Photo")
        .populate("comments.postedBy", "_id name Photo")
        .sort("-createdAt")
        .then(post => res.json(post))
        .catch(err => console.log(err))
})

Postrouter.post('/createpost', requireLogin, async (req, res) => {
    const { photo, body } = req.body;
    if (!photo || !body) {
        return res.status(400).json({ error: "please add all fields" })
    }
    const post = new Post({
        body, photo, postedBy: req.user
    })

    await post.save()
        .then(result => {
            return res.status(200).json({ post: result })
        })
        .catch(err => console.log(err));
})

//to show following post
Postrouter.get("/myfollowingpost", requireLogin, async (req, res) => {
    try {
      const posts = await Post.find({ postedBy: { $in: req.user.following } })
        .populate("postedBy", "_id name")
        .populate("comments.postedBy", "_id name");
      
      return res.status(200).json(posts);
    } catch (error) {
      return res.status(400).json({ error: "An error occurred" });
    }
  });
  

module.exports = Postrouter