const users = require('../Model/userModel')
const jwt = require('jsonwebtoken')
//register

exports.registerController = async (req,res)=>{
    console.log("Inside Register Controller function");
    const {username,email,password}=req.body
    const existingUser =await users.findOne({email})
    try{
        if(existingUser){
            res.status(406).json("Already registered..please login!!!")
        }else{
            const newUser = new users({
                username,email,password,profile:"",github:"",linkedin:""
            })
            await newUser.save()
            res.status(200).json(newUser)
    
        }
    }
    catch(err){
        res.status(401).json(`register api failed: ${err}`)
    }
    
}

//login
exports.loginController = async (req,res)=>{
    const {email,password} = req.body
    const existingUser = await users.findOne({email,password})
    try{
        if(existingUser){
            const token = jwt.sign({userId:existingUser._id},"supersecretkey12345")
            res.status(200).json({
                existingUser,token
            })
        }else{
            res.status(404).json("incorrect email/password")
        }
    }catch(err){
        res.status(401).json(`login api failed: ${err}`)
    }
}

//edit user profile
exports.editUserController = async (req,res)=>{
    const userId  =req.payload
    const {username,email,password,github,linkedin,profile} = req.body
    const uploadImage = req.file?req.file.filename:profile
    try{
        const updatedUser = await users.findByIdAndUpdate({_id:userId},{
            username,email,password,profile:uploadImage,github,linkedin
        },{new:true})
        await updatedUser.save()
        res.status(200).json(updatedUser)
    }catch(err){
        res.status(401).json(err)

    }
}