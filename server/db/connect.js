const mongoose = require('mongoose')


mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGODB_URL,{  useNewUrlParser: true,})
.then((res)=>console.log('mongodb connected'))
.catch((err)=>console.log(err))