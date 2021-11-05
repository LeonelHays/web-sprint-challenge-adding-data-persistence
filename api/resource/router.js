// build your `/api/resources` router here
const express = require('express');
const Resource = require('./model');

const router = express.Router();

router.get('/', (req, res, next) => {
    Resource.getResource()
        .then(resources => {
            res.status(200).json(resources)
        })
        .catch(next);
})
router.post('/', async (req, res, next) => {
    try{
    const resources = req.body
    const error = { status: 400 }
    const existing = await Resource.getByResourceName(resources.resource_name)
    if(existing){
        next({...error, message: 'resource already exists'})
    }else{
        const resource = await Resource.addResource(resources)
        res.status(201).json(resource)
    }
    }catch(err){
        next(err)
    }
    
})

module.exports = router;