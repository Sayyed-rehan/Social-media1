const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL)
.then((res)=>console.log('mongodb connected'))
.catch((err)=>console.log(err))