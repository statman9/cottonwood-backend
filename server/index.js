'use strict';
const express           = require('express');
const bodyParser        = require('body-parser');
const postController    = require('./controller/controller');

const app = express();

app.use(bodyParser.json());

app.use('/posts', 
    bodyParser.urlencoded({ extended: true }),
    bodyParser.json(), 
    postController);

app.get('/', (req, res) => {
    res.render('../www/index.html');
})

const listener = app.listen(8081, function(err) {
    if (err) throw err;
   
    const port = listener.address().port;
    console.log('Server listening on port: ' + port);
    
    // in development mode the server is started as a child process and
    // this next line will tell the parent process that the server is ready
    if (process.send) process.send({ type: 'server-listening', port: port });
});