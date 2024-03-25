const projects = require('../Model/projectModel')

exports.addProjectController = async (req,res)=>{

console.log("Inside add project controller");

    const userId = req.payload
    console.log(userId);
    const projectImage = req.file.filename
    const {title,languages,overview,github,website} = req.body
    console.log(projectImage);
    //console.log(`${title},${languages},${overview},${github},${website},${projectImage},${userId}`);
    
    try{
    const existingProjects = await projects.findOne({github})
    if(existingProjects){
        res.status(406).json("Projects already Exists!!!")
    }else{
        const newProject = new projects({
            title,languages,overview,github,website,projectImage,userId
        })
        console.log(newProject);
        await newProject.save()
        res.status(200).json(newProject)
        // res.status(200).json("add project req received")
    }
    }catch(err){
        res.status(401).json(`request failed: ${err}`)

    }
   




}

//getuserprojects-token requied

exports.allUserProjects = async (req,res)=>{
    const userId = req.payload
    try{
        const userProjects = await projects.find({userId})
        res.status(200).json(userProjects)
    }catch(err){
        res.status(401).json(err)
    }
}

//allprojects

exports.allProjects = async (req,res)=>{
   const searchKey = req.query.search
   const query = {
    languages:{$regex:searchKey,$options:"i"}
   }
    try{
        const projectDetails = await projects.find(query)
        res.status(200).json(projectDetails)
    }catch(err){
        res.status(401).json(err)
    }
}

//gethomeprojects

exports.homeProjects = async (req,res)=>{
   
    try{
        const homeProjects = await projects.find().limit(3)
        res.status(200).json(homeProjects)
    }catch(err){
        res.status(401).json(err)
    }
}

//edit projects
exports.editProjectsController = async (req,res)=>{
   
    //get projectId
    const {id} = req.params
    //get userId
    const userId  =req.payload
    //get req data
    const {title,languages,overview,github,website,projectImage} = req.body
    console.log(title);
    const uploadProjectImage = req.file?req.file.filename:projectImage
    try{
        const updateProjects = await projects.findByIdAndUpdate({_id:id},{
            title,languages,overview,github,website,projectImage:uploadProjectImage,userId
        },{new:true})
        await updateProjects.save()
        res.status(200).json(updateProjects)
       
    }catch(err){
        res.status(401).json(err)
    }
}

//delete project
exports.deleteProjectController  =async (req,res)=>{
    //get projectId
    const {id} = req.params
    

    try{
        const deleteProject = await projects.findByIdAndDelete({_id:id})
        await deleteProject.save()
        res.status(200).json(deleteProject)
    }catch(err){
        res.status(401).json(err)
    }

}