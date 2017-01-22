// Initialize Socket
var socket = io();
  socket.on('emotions', function(emotion){
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>");
    alert(JSON.stringify(emotion));
});
