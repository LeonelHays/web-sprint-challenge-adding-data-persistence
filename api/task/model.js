// build your `Task` model here
const db = require('../../data/dbConfig.js');

function getTask() {
    return db('projects as p')
    .leftJoin(
        'tasks as t',
        't.project_id',
        'p.project_id'
    )
    .select(
        't.task_description',
        't.task_notes',
        't.task_completed',
        'p.project_name', 
        'p.project_description',
        't.task_id'
    )
    .orderBy('t.task_id');
}
function addTask(tasks) {
    return db('tasks').insert(tasks)
        .then(([task_id]) => {
            return db('projects as p')
                .leftJoin(
                    'tasks as t',
                    't.project_id',
                    'p.project_id'
                )
                .select(
                    't.*',
                    'p.project_name', 
                    'p.project_description',

                )
                .where('task_id', task_id)
                .first()
        })
}

module.exports = {
    getTask,
    addTask
}