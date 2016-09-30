var pictionary = function() {
    var socket = io();
    var canvas, context, drawing;
    var display  = $('#guess-list');

    var draw = function(position) {
        context.beginPath();
        context.arc(position.x, position.y,
                         6, 0, 2 * Math.PI);
        context.fill();
    };

    canvas = $('canvas');
    context = canvas[0].getContext('2d');
    canvas[0].width = canvas[0].offsetWidth;
    canvas[0].height = canvas[0].offsetHeight;
    
    canvas.on('mousedown', function(event) {
         drawing = true;
    });
    
    canvas.on('mouseup', function(event) {
        drawing = false;
    })
    
    canvas.on('mousemove', function(event) {
        if(drawing){
        var offset = canvas.offset();
        var position = {x: event.pageX - offset.left,
                        y: event.pageY - offset.top};
        draw(position);                
        socket.emit('draw', position);
        } 
    });
    
var userGuess = function(guess){
    display.append('<li>'+ guess + '</li>');
}
    
    var guessBox = $('#usr-guess');

var onKeyDown = function(event) {
    if (event.keyCode != 13) {
        return;
    }

    var guess = guessBox.val();
    console.log(guess);
    userGuess(guess);
    socket.emit('guess', guess);
    guessBox.val('');
};

    
    guessBox.on('keydown', onKeyDown);
   
    
    socket.on('draw', draw);
    socket.on('guess', userGuess);
};

$(document).ready(function() {
    pictionary();
    
    
});