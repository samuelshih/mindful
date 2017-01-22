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

var socket = io();
