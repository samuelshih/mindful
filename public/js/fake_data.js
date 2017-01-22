
// Run for first time init, works for fake data in the beginning
var date = new Date();
var hour = String(date.getHours())
for(var i = 0; i < 30; i++) {
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


var total = 0;
for (var min = 0; min < 60; min++){
  var key = String(hour) + '_' + String(min);
  if (key in socket_data){
    num = Number(socket_data[key]['entries']);
    total += num;
    averages[0] += feels['anger'][min]*num;
    averages[1] += feels['disgust'][min]*num;
    averages[2] += feels['fear'][min]*num;
    averages[3] += feels['joy'][min]*num;
    averages[4] += feels['sadness'][min]*num;
  }
}
for (var k = 0; k < 5; k++){
  averages[k] = averages[k] / total;
}

updatePieCharts(); // for first time init
