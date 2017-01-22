// Initialize Socket
// Function that generates an array of 5 numbers that add up to 1
function add(a, b) {
    return a + b;
}

function generate(num=5) {
  var emotions = [];
  for(var i = 0; i < num; i++) {
    emotions.push(Math.random());
  }
  var sum = emotions.reduce(add, 0);
  for(var i = 0; i < num; i++) {
    emotions[i] /= sum;
  }
  return emotions
};

 // Populate Socket Data
var socket_data = {}
for(var i = 0; i < 23; i++) {
  var key = '2017_1_1_' + String(i);
  var points = generate();
  socket_data[key] = {
    'anger': points[0],
    'disgust': points[1],
    'fear': points[2],
    'joy': points[3],
    'sadness': points[4]
  }
}

var socket = io();

socket.on('emotions', function(emotion){
  alert(JSON.stringify(emotion));
});
