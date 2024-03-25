require('dotenv').config() //to load .env file variable to access process.env file to use dotenv package with config method.
const express = require('express')//install express for node server
const cors = require('cors')//express is loading in one port No then frontend is loading in another port No.then we need to data sharing using cors.

const router = require('./Routes/router')
require('./DB/connection')

const pfServer = express()//craete express server

pfServer.use(cors())
pfServer.use(express.json())//data sharing in json formate using RESTful API so that json formate is not understand in express so need to convert json to js formate object so we use converting this using express.json() method or bodyparser packeges.
pfServer.use(router)
pfServer.use('/uploads',express.static('./uploads'))
const PORT = 4000 || process.env.PORT
pfServer.listen(PORT,()=>{
    console.log(`pfServer is started at port ${PORT}.waiting for client request!!`);
})



pfServer.get('/',(req,res)=>{
res.send("<h1>PfServer is started..waiting for client request</h1>")
})

