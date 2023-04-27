const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    heading:String,
    desc:String,
    img:String,
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps: true});

const Post  = mongoose.model("Post", postSchema);

module.exports = Post;