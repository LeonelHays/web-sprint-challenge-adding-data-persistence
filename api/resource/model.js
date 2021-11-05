// build your `Resource` model here
const db = require('../../data/dbConfig.js');

function getResource() {
    return db('resources');
}

const getByResourceName = (resource_name) => {
    return db('resources')
        .where('resource_name', resource_name)
        .first();
}

function addResource(resources) {
    return db('resources').insert(resources)
        .then(([resource_id]) => {
            return db('resources').where('resource_id', resource_id).first()
        })
}

module.exports = {
    getResource,
    addResource,
    getByResourceName
}