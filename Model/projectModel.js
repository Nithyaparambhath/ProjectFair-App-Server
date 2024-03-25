const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    title:{
        type:String,
        requied:true
    },
    languages:{
        type:String,
        requied:true
    },
    overview:{
        type:String,
        requied:true
    },
    github:{
        type:String,
        requied:true
    },
    website:{
        type:String,
        requied:true
    },
    projectImage:{
        type:String,
        requied:true
    },
    userId:{
        type:String,
        requied:true
    }
})

const projects = mongoose.model('projects',projectSchema)
module.exports = projects