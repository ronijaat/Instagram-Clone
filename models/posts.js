const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types

const postSchmea = mongoose.Schema({
    body : {
        type : String,
        required : true
    },
    photo : {
        type : String,
        required : true
    },
    postedBy : {
        type : ObjectId,
        ref : "User"
    },
    likes : [
        {
            type : ObjectId,
            ref : "User"
        }
    ],
    comments : [
        {
            comment : {
                type : String
            },
            postedBy : {
                type : ObjectId,
                ref : "User"
            }
        }
    ]
},{
    timestamps : true
})

module.exports = mongoose.model("Post",postSchmea);

