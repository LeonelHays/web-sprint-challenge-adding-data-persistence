// build your `/api/tasks` router here
const express = require('express');
const Task = require('./model')

const router = express.Router();

router.get('/', (req, res, next) => {
    Task.getTask()
        .then(task => {
            task.forEach(task => {
                if(task.task_completed === 1){
                    task.task_completed = true
                } else if(
                    !task.task_completed ||
                    task.task_completed === 0
                ){
                    task.task_completed = false
                }
             });
            res.status(200).json(task)
        })
        .catch(next)
})
router.post('/', (req, res, next) => {
    const tasks = req.body

    Task.addTask(tasks)
        .then(task => {
            if(task.project_id && task.task_description){
                if(task.task_completed === 1){
                    task.task_completed = true
                } else if(
                    !task.task_completed ||
                    task.task_completed === 0
                ){
                    task.task_completed = false
                }
                console.log(task)
                res.status(201).json(task)
            }else{
                res.status(400).json({
                    message: 'missing project_id field'
                })
            }
        })
        .catch(next)
})

module.exports = router;