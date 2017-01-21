var socket = io();
  socket.on('emotions', function(number){
    alert(number);
});
