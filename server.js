var http = require('http');
var express = require('express');
var socket_io = require('socket.io');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);

var drawerSocketId;

var WORDS = [
    "word", "letter", "number", "person", "pen", "class", "people",
    "sound", "water", "side", "place", "man", "men", "woman", "women", "boy",
    "girl", "year", "day", "week", "month", "name", "sentence", "line", "air",
    "land", "home", "hand", "house", "picture", "animal", "mother", "father",
    "brother", "sister", "world", "head", "page", "country", "question",
    "answer", "school", "plant", "food", "sun", "state", "eye", "city", "tree",
    "farm", "story", "sea", "night", "day", "life", "north", "south", "east",
    "west", "child", "children", "example", "paper", "music", "river", "car",
    "foot", "feet", "book", "science", "room", "friend", "idea", "fish",
    "mountain", "horse", "watch", "color", "face", "wood", "list", "bird",
    "body", "dog", "family", "song", "door", "product", "wind", "ship", "area",
    "rock", "order", "fire", "problem", "piece", "top", "bottom", "king",
    "space"
];

var getWord = function() {
    return WORDS[Math.floor(Math.random() * WORDS.length)];
};

io.on('connection', function(socket) {
   
    if (!drawerSocketId) {
        drawerSocketId = socket.id;
        io.to(drawerSocketId).emit('userAction', { user: "Drawer" }, getWord());

    } else {
        io.to(socket.id).emit('userAction', { user: "Guesser" });

    }

    socket.on('draw', function(position) {
        socket.broadcast.emit('draw', position);
    });
    

    socket.on('guess', function(guess) {
        socket.broadcast.emit('guess', guess);
    });
    
    socket.on('disconnect', function() {
        console.log('A user has disconnected');
    })
    
});



server.listen(process.env.PORT || 8080);
