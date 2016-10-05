
$(document).ready(function() {
    var socket = io();
    var canvas, context, drawing;
    var displayGuess  = $('#guess-list');
    var guessBox = $('#usr-guess');
    var guess = $('#guess');
    var wordChoice = $('#wordChoice span');
    var clear = ('#clear');
    

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

    
    
var userAction = function(data, word){
    if(data.user == 'Drawer'){
        
       
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
            wordChoice.text(word);
            
        });

    }else{
        
       
        guessBox.on('keydown', onKeyDown);
        guess.show();
        $('#wordChoice').hide();
    }
}    

var userGuess = function(guess){
    displayGuess.append('<li>'+ guess + '</li>');
}
    
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

   
    socket.on('draw', draw);
    socket.on('guess', userGuess); 
    socket.on('userAction', userAction);
    
});