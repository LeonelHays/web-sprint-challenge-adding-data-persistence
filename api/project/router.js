// build your `/api/projects` router here
const express = require('express')
const Project = require('./model')

const router = express.Router();

router.get('/', (req, res, next) => {
    Project.getProject()
        .then(projects => {
         projects.forEach(proj => {
            if(proj.project_completed === 1){
                proj.project_completed = true
            } else if(
                !proj.project_completed ||
                proj.project_completed === 0
            ){
                proj.project_completed = false
            }
         });


            res.status(200).json(projects)
        })
        .catch(next);
})
router.post('/', (req, res, next) => {
    const projects = req.body

    Project.addProject(projects)
        .then(projects => {
            if(projects.project_name){
                if(projects.project_completed === 1){
                    projects.project_completed = true
                } else if(
                    !projects.project_completed ||
                    projects.project_completed === 0
                ){
                    projects.project_completed = false
                }
                res.status(201).json(projects)
            }else{
                res.status(400).json({
                    message: 'missing name field'
                })
            }
        })
        .catch(next)
})

module.exports = router;
//the sanity is failling in the code-grade
