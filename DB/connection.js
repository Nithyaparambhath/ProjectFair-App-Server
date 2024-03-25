const mongoose = require('mongoose')
const connection_string = process.env.CONNECTION_STRING

mongoose.connect(connection_string).then(()=>{
    console.log("ProjectFairApp connected with mongodb successfullly connected");
}).catch((err)=>{
    console.log(`mongodb connection failed:${err}`);
})