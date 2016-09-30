var pictionary = function() {
    var socket = io();
    var canvas, context, drawing;

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
    socket.on('draw', draw);
};

$(document).ready(function() {
    pictionary();
    
    
});