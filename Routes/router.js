const express = require('express')
const userController = require('..//Controllers/userController')
const projectController = require('../Controllers/projectController')
const jwtMiddleware = require('../Middleware/jwtMiddleware')
const multerConfig = require('../Middleware/multerMiddleware')
const router = new express.Router()

//register Api request
router.post('/user/register',userController.registerController)

//login
router.post('/user/login',userController.loginController)

//addproject
router.post('/project/add',jwtMiddleware,multerConfig.single('projectImage'),projectController.addProjectController)

//getuserProjects
router.get('/user/all-projects',jwtMiddleware,projectController.allUserProjects)

//getallprojects
router.get('/projects/all',jwtMiddleware,projectController.allProjects)

//gethomeprojects
router.get('/projects/home-projects',projectController.homeProjects)


//editproject
router.put('/projects/edit/:id',jwtMiddleware,multerConfig.single("projectImage"),projectController.editProjectsController)


//deleteproject
router.delete('/projects/delete/:id',jwtMiddleware,projectController.deleteProjectController)

//editprofile
router.put('/user/edit',jwtMiddleware,multerConfig.single("profileImage"),userController.editUserController)


module.exports = router