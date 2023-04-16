const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    heading:String,
    desc:String,
    img:String,
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"USer"
    }
}, {timeStamp:true});

const Post  = mongoose.model("Post", postSchema);

module.exports = Post;