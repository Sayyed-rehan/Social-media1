const express = require('express')
const app  = express()
require("./db/connect")
const bycrypt = require("bcryptjs")
const User = require("./models/userSchema")
const Post = require("./models/postSchema")
const cors  = require('cors')

app.use(express.json())
app.use(cors())


//create
app.post("/sigin", async(req,res)=>{
    const {name,email,phone,password,role} = req.body;
    const hasspass = await  bycrypt.hash(password, 12)

    const empltyFiled = [];
    if(!name) empltyFiled.push("name")
    if(!email) empltyFiled.push("email")
    if(!phone) empltyFiled.push("phone")
    if(!hasspass) empltyFiled.push("password")

    if(empltyFiled.length>0){
        return res.json({
            success:false,
            mess:`${empltyFiled.join(' , ')} are required`
        })
    }

    const data = new User({name, email, phone, password:hasspass, role})
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
    const data = await  Post.find()
    res.json({
        success:true,
        mess:"all posts", 
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

//deletPost
app.delete("/deletPost", async(req,res)=>{

    const{heading} = req.query
    const data = await Post.findOneAndDelete({heading:heading})
    res.json({
        success:true,
        mess:"post deleted",
        data:data
    })
})

//updatePost
app.patch("/updatePost", async(req,res)=>{

    const data = await Post.findByIdAndUpdate(req.query,req.body, {new:true})
    res.json({
        success:true,
        mess:"post updated",
        data:data
    })
})

app.listen(5000, console.log('server started at 5000'))
