const mongoose =require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        requied:true,
        min:[3,"Must be at least 3, got {VALUE}"]
    },
    email:{
        type:String,
        requied:true,
        unique:true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email")
            }
        }

    },
    password:{
        type:String,
        requied:true
    },
    profile:{
        type:String,
    },
    github:{
        type:String,
    },
    linkedin:{
        type:String,
    }

})

const users = mongoose.model('users',userSchema)
module.exports = users