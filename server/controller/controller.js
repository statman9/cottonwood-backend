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
    db.query("SELECT * from posts WHERE id='" + req.params.id + "'", 
    (err, result) => {
        if (err) {throw err;}
        res.json(result);
    });
});

router.post('/', (req, res) => {
    db.query("INSERT INTO posts SET ?", req.body
    , (err, result) => {
        if (err) {throw err;}
        res.json(result);
    });
});

router.delete('/:id', (req, res) => {
    db.delete("DELETE FROM posts WHERE id='" + req.params.id + "'", 
    (err, result) => {
        if (err) {throw err;}
        res.json(result);
    });
});

router.put('/:id', (req, res) => {
    db.query("UPDATE posts SET title=?, content=?, updated_at='now()' WHERE id= ?", [req.body.title, req.body,content, req.params.id],
    (err, result) => {
        if (err) {throw err;}
        res.json(result);
    });
});