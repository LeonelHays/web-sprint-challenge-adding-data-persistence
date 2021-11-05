// build your server here and require it from index.js
const express = require('express')

const TaskRouter = require('./task/router')
const ProjectRouter = require('./Project/router')
const ResourceRouter = require('./resource/router')

const server = express()

server.use(express.json())
server.use('/api/projects', ProjectRouter)
server.use('/api/resources', ResourceRouter)
server.use('/api/tasks', TaskRouter)

server.use((err, req, res, next) => { // eslint-disable-line
    res.status(500).json({
        message: err.message,
        stack: err.stack,
    });
});

module.exports = server;