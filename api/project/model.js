// build your `Project` model here
const db = require('../../data/dbConfig.js');

function getProject() {
    return db('projects');
}
function addProject(projects) {
    return db('projects').insert(projects)
        .then(([project_id]) => {
            return db('projects')
                .where('project_id', project_id)
                .first()
        })
}

module.exports = {
    getProject,
    addProject
}