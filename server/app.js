const PORT = process.env.PORT || 5000
const dotenv= require('dotenv');
const express = require('express')
const app  = express()
dotenv.config();
const path =require('path')
const ___dirname = path.resolve();


require("./db/connect")
const bycrypt = require("bcryptjs")
const User = require("./models/userSchema")
const Post = require("./models/postSchema")
const cors  = require('cors')

app.use(express.json())
app.use(cors())


//create
app.post("/sigin", async(req,res)=>{
    const {name,email,phone,password,city,role} = req.body;
    const hasspass = await  bycrypt.hash(password, 12)

    const empltyFiled = [];
    if(!name) empltyFiled.push("name")
    if(!email) empltyFiled.push("email")
    if(!phone) empltyFiled.push("phone")
    if(!city) empltyFiled.push("city")
    if(!hasspass) empltyFiled.push("password")

    if(empltyFiled.length>0){
        return res.json({
            success:false,
            mess:`${empltyFiled.join(' , ')} are required`
        })
    }

    const data = new User({name, email, phone, password:hasspass, city ,role})
    await data.save();

    res.json({
        success:true,
        mess:"Added and Sigin success",
        data:data
    })
})

//login
app.post("/login", async(req,res)=>{

    const exitEmail = await User.findOne({email:req.body.email})
    try {
        const exitPassword = await bycrypt.compare(req.body.password, exitEmail.password)
        if(exitEmail && exitPassword){
            return res.json({
                success:true,
                mess:"logined",
                data:exitEmail
            })
        }else{
            res.json({
                success:false,
                mess:"invalid"
            })
        }   
    } catch (error) {
        res.json({
            success:false,
            mess:"invalid"
        })
    }   
    
})

//allPost
app.get("/allPost", async(req,res)=>{
    const data = await  Post.find().sort({createdAt:-1});
    res.json({
        success:true,
        mess:"all posts", 
        data:data
    })
})

//get post by heading
app.get("/byheading", async(req,res)=>{
    
    const {heading} = req.query
    const data = await Post.find({heading:{$regex: heading, $options:"i"}})

    res.json({
        success:true,
        mess:"post fetch by heading",
        data:data
    })
})


//createPost
app.post("/createPost", (req,res)=>{

    const data = new Post(req.body)
    data.save()
    res.json({
        success:true,
        mess:"post created",
        data:data
    })
})

//deletPost by heading
app.delete("/deletPost", async(req,res)=>{

    const{heading} = req.query
    const data = await Post.findOneAndDelete({heading:heading})
    res.json({
        success:true,
        mess:"post deleted",
        data:data
    })
})

//deletePostById
app.delete("/deletePostById", async(req,res)=>{
    const {_id} = req.query
    const data = await Post.findByIdAndDelete(_id)
    res.json({
        success:true,
        mess:"post deleted",
        data:data
    })
})

//updatePost
app.patch("/updatePost", async(req,res)=>{

    const data = await Post.findByIdAndUpdate(req.query,req.body)
    res.json({
        success:true,
        mess:"post updated",
        data:data
    })
})

//get User by City
app.get("/getUserbyCity", async(req,res)=>{
    
    const {city} = req.query
    const data = await User.find({city:{$regex: city, $options:"i"}})

    res.json({
        success:true,
        mess:"post fetch by heading",
        data:data
    })
})

// get User By ID
app.get("/getUserByID", async(req,res)=>{

    const {_id} = req.query
    const data = await User.findOne({_id:_id})
    res.json({
        success:true,
        mess:"User by Id",
        data:data
    })
})


//route ends here
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(___dirname, '..', 'client', 'dist')));
  
    app.get('*', (req, res) => {
      res.sendFile(path.join(___dirname, '..', 'client', 'dist', 'index.html'));
    });
  }


app.listen(5000, console.log(`server started at ${PORT}`))
