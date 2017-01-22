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
var date = new Date();
var hour = String(date.getHours())
for(var i = 0; i < 1; i++) {
  var key = String(hour) + '_' + String(i);
  var points = generate();
  socket_data[key] = {
    'anger': points[0],
    'disgust': points[1],
    'fear': points[2],
    'joy': points[3],
    'sadness': points[4],
    'entries': Math.floor(Math.random() * 10) + 1
  }
}

var socket = io();
