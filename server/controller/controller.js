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
    db.query("INSERT INTO posts SET id='UUID()', title='"+ req.body.title +"', content='"+req.body.content+"', created_at=" + mysql.raw('CURRENT_TIMESTAMP()'),
    (err, result) => {
        if (err) {throw err;}
        res.json(result);
    });
});

router.delete('/:id', (req, res) => {
    db.query("UPDATE posts SET deleted_at=" + mysql.raw('CURRENT_TIMESTAMP()') + "WHERE id='" + req.params.id + "'",
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
    db.query("UPDATE posts SET title=?, content=?, updated_at=" + mysql.raw('CURRENT_TIMESTAMP()') + " WHERE id= ?", [req.body.title, req.body,content, req.params.id],
    (err, result) => {
        if (err) {throw err;}
        res.json(result);
    });
});