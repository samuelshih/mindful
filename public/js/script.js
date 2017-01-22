var socket = io();
  socket.on('emotions', function(emotion){
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>");
    alert(JSON.stringify(emotion));
});

 // {"2017_0_21_19":{"anger":"0.081767","disgust":"0.050649","fear":"0.098549","joy":"0.567902","sadness":"0.239843","entries":1}}
