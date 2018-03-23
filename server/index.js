'use strict';
const express           = require('express');
const bodyParser        = require('body-parser');
const postController    = require('./controller/controller');
const path              = require('path');

const app = express();

app.use(express.static(path.resolve(__dirname, '/www')));
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());

app.use('/posts', postController);

app.get('/', (req, res) => {
    res.render('./index.html');
});

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Pass to next layer of middleware
    next();
});

const listener = app.listen(8081, function(err) {
    if (err) throw err;
   
    const port = listener.address().port;
    console.log('Server listening on port: ' + port);
    
    // in development mode the server is started as a child process and
    // this next line will tell the parent process that the server is ready
    if (process.send) process.send({ type: 'server-listening', port: port });
});