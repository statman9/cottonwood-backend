'use strict';
const db        = require('../database')('ember_example');
const Router    = require('express').Router;

const router = new Router();
module.exports = router;

router.get('/', (req, res) => {
    db.query("SELECT * from posts",
    (err, result) => {
        if (err) { throw err; }
        res.json(result);
    });
});

router.get('/:id', (req, res) => {
    db.query("SELECT * from posts WHERE id=" + req.params.id, 
    (err, result) => {
        if (err) {throw err;}
        res.json(result);
    });
});

router.post('/', (req, res) => {
    db.insert('posts', {

    }, (err, result) => {
        if (err) {throw err;}
        res.json(result);
    });
});

router.delete('/:id', (req, res) => {
    db.delete('posts', {
        id: {operator: '=', value: req.params.id}
    }, (err, result) => {
        if (err) {throw err;}
        res.json(result);
    });
});

router.put('/:id', (req, res) => {
    db.update('posts', {

    },
    {
        id: {operator: '=', value: req.params.id}
    }, (err, result) => {
        if (err) {throw err;}
        res.json(result);
    });
});