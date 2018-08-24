const express = require('express');
const cors = require('cors');
const actionModel = require('./data/helpers/actionModel');
const mappers = require('./data/helpers/mappers');
const projectModel = require('./data/helpers/projectModel')


const server = express();
server.use(express.json());
server.use(cors());
const port = 5000;

// ACTIONS CRUD /////////////////////////

server.get('/api/actions', (req, res)=>{
    actionModel.get()
    .then(response => {
        res.status(201).json(response);
    })
    .catch(error => {
        res.json(error)
    })
})

server.get('/api/actions/:id', (req, res) => {
    const { id } = req.params;
    actionModel.get(id)
        .then(response => {
            res.status(201).json(response);
        })
        .catch(error => {
            res.json(error);
        })
})

server.post('/api/actions', (req,res) => {
    //const { description, project_id, completed } = req.body;
    actionModel.insert(req.body)
    .then( response => {
        res.status(201).json(response);
    })
    .catch(error => {
        res.json(error);
    })
})

server.put('/api/actions/update/:id', (req, res)=>{
    const { id } = req.params;
    const { description, project_id, completed } = req.body;
    actionModel.update(id, req.body)
    .then( response => {
        res.status(201).json(response);
    })
    .catch(error => {
        res.json(error);
    })
})

server.delete('/api/actions/delete/:id', (req, res)=>{
    const { id } = req.params;
    actionModel.remove(id)
    .then(response => {
        res.status(201).json(response)
    })
    .catch(error => {
        res.json(error);
    })
})



// PROJECTS CRUD /////////////////////////

server.get('/api/projects/:project_id/actions', (req, res)=>{
    const { project_id } = req.params;
    projectModel.getProjectActions()
    .then(response => {
        res.status(201).json(response);
    })
    .catch(error => {
        res.json(error);
    })
})

server.get('/api/projects', (req, res) => {
    projectModel.get()
        .then(response => {
            res.status(201).json(response);
        })
        .catch(error => {
            res.json(error)
        })
})

server.get('/api/projects/:id', (req, res) => {
    const { id } = req.params;
    projectModel.get(id)
        .then(response => {
            res.status(201).json(response);
        })
        .catch(error => {
            res.json(error);
        })
})

server.post('/api/projects', (req, res) => {
    const { description, project_id, completed } = req.body;
    projectModel.insert(req.body)
        .then(response => {
            res.status(201).json(response);
        })
        .catch(error => {
            console.log(error);
            res.json(error);
        })
})

server.put('/api/projects/update/:id', (req, res) => {
    const { id } = req.params;
    const { description, project_id, completed } = req.body;
    projectModel.update(id, req.body)
        .then(response => {
            res.status(201).json(response);
        })
        .catch(error => {
            res.json(error);
        })
})

server.delete('/api/projects/delete/:id', (req, res) => {
    const { id } = req.params;
    projectModel.remove(id)
        .then(response => {
            res.status(201).json(response)
        })
        .catch(error => {
            res.json(error);
        })
})

server.listen(port, ()=>{console.log(`Backend is in another castle: ${port}`)})