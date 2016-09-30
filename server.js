var http = require('http');
var express = require('express');
var socket_io = require('socket.io');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);


io.on('connection', function(socket){
    socket.on('draw', function(position){
        socket.broadcast.emit('draw', position);
    });
    
    socket.on('guess', function(guess){
        socket.broadcast.emit('guess', guess);
    })
    
});

server.listen(process.env.PORT || 8080);