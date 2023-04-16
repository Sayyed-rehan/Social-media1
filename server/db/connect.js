const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/facebook")
.then((res)=>console.log('mongodb connected'))
.catch((err)=>console.log(err))

