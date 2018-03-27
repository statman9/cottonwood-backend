'use strict';
const db        = require('../database')('ember_example');
const Router    = require('express').Router;
const mysql     = require('mysql');

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
    var currentTime = mysql.raw('CURRENT_TIMESTAMP()');
    var newId = mysql.raw('UUID()');
    db.query("INSERT INTO posts SET id=?, title=?, content=?, created_at=?", [newId, req.body.title, req.body.content, currentTime],
    (err, result) => {
        if (err) {throw err;}
        res.json(result);
    });
});

router.delete('/:id', (req, res) => {
    var currentTime = mysql.raw('CURRENT_TIMESTAMP()');
    db.query("UPDATE posts SET deleted_at=? WHERE id=?", [currentTime, req.params.id],
    (err, result) => {
        if (err) {throw err;}
        db.query("DELETE FROM posts WHERE id='" + req.params.id + "'", 
        (error, result2) => {
            if (error) {throw error;}
            res.json(result);
        });
    })
    
});

router.put('/:id', (req, res) => {
    var currentTime = mysql.raw('CURRENT_TIMESTAMP()');
    db.query("UPDATE posts SET title=?, content=?, updated_at=? WHERE id= ?", [req.body.title, req.body,content, currentTime, req.body.id],
    (err, result) => {
        if (err) {throw err;}
        res.json(result);
    });
});