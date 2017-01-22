// {"2017_0_21_19":{"anger":"0.081767","disgust":"0.050649","fear":"0.098549","joy":"0.567902","sadness":"0.239843","entries":1}}
var emotion_names = ['anger', 'disgust', 'fear', 'joy', 'sadness'];
var emotionsColors = {
  'anger' : '#e74c3c',
  'disgust' : '#8e44ad',
  'fear': '#2c3e50',
  'joy' : '#2ecc71',
  'sadness' : '#2980b9'
}

var minutes = [];
for (var i=0; i< 30; i++) {
    if (i%10 == 0){
      minutes[i] = String(i);
    }
    else{
      minutes[i] = '';
    }
}

var blank = "rgba(0, 0, 0, 0)"

// *********************
// *** LINE GRAPH ******
// *********************

// feels['emotion'] = [#'s filling from socket_data]
var date = new Date();
var hour = String(date.getHours())
var feels = {'anger': [], 'disgust': [], 'fear': [], 'joy': [], 'sadness' : []};
for (var min = 0; min < Object.keys(socket_data).length; min++){
  var key = String(hour) + '_' + String(min);
  if (key in socket_data){
    feels['anger'].push(Number(socket_data[key]['anger'])*100);
    feels['disgust'].push(Number(socket_data[key]['disgust'])*100);
    feels['fear'].push(Number(socket_data[key]['fear'])*100);
    feels['joy'].push(Number(socket_data[key]['joy'])*100);
    feels['sadness'].push(Number(socket_data[key]['sadness'])*100);
  }
}


var lineData = {
  labels: minutes,
  datasets: [{
      label: 'anger',
      data: feels['anger'],
      borderColor: emotionsColors['anger'],
      backgroundColor: blank,
      responsive: true
    }, {
      label: 'disgust',
      data: feels['disgust'],
      borderColor: emotionsColors['disgust'],
      backgroundColor: blank,
      responsive: true
    }, {
      label: 'fear',
      data: feels['fear'],
      borderColor: emotionsColors['fear'],
      backgroundColor: blank,
      responsive: true
    }, {
      label: 'joy',
      data: feels['joy'],
      borderColor: emotionsColors['joy'],
      backgroundColor: blank,
      responsive: true
    }, {
      label: 'sadness',
      data: feels['sadness'],
      borderColor: emotionsColors['sadness'],
      backgroundColor: blank,
      responsive: true
    }]
};

var lineCtx = document.getElementById('emotionsLineChart').getContext('2d');
var lineChart = new Chart(lineCtx, {
 type: 'line',
 data: lineData
});

// *********************
// *** RADAR GRAPH *****
// *********************

// calculating the average emotions over the whole day
// INITIALIZATION ONLY, not called on socket signal
var averages = [0, 0, 0, 0, 0];

// setting attrubutes of the html classes for our graphs

function updatePieCharts(){
  $("#easypiechart-anger").attr('data-percent',averages[0]);
  $("#easypiechart-disgust").attr('data-percent',averages[1]);
  $("#easypiechart-fear").attr('data-percent',averages[2]);
  $("#easypiechart-joy").attr('data-percent',averages[3]);
  $("#easypiechart-sadness").attr('data-percent',averages[4]);

  $('.anger-percent').html(String(averages[0].toFixed(0)) + '%');
  $('.disgust-percent').html(String(averages[1].toFixed(0)) + '%');
  $('.fear-percent').html(String(averages[2].toFixed(0)) + '%');
  $('.joy-percent').html(String(averages[3].toFixed(0)) + '%');
  $('.sadness-percent').html(String(averages[4].toFixed(0)) + '%');
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

function updateAverages(user) {

  for(var i = 0; i < averages.length; i++) {
    var emotions = user['emotions'] // emotions hash
    var data = emotions[Object.keys(emotions)[0]]
    var new_avg = (averages[i] * user['numEntries'] + data[emotion_names[i]]*100 ) / (user['numEntries'] + 1);
    averages[i] = new_avg
  }
  updatePieCharts();
}

var radarData = {
  labels: emotion_names,
  datasets: [{
    label: "Me",
    backgroundColor: "rgba(153,255,51,0.4)",
    borderColor: "rgba(153,255,51,1)",
    data: averages
  }]
}

var radarCtx = document.getElementById('emotionsRadarChart').getContext('2d');
var radarChart = new Chart(radarCtx, {
  type: 'radar',
  data: radarData,
  responsive: true,
  options: {
    scale: {
      ticks: {
          beginAtZero: true
      }
    }
  }
});

function refresh(element){
   //alert("In function");
   var container = document.getElementById(element);
   var content = container.innerHTML;
   //alert(content);
   container.innerHTML= content;
}

var socket = io();

socket.on('emotions', function(user){
  console.log(JSON.stringify(user));
  socket_data = user['emotions']
  var emotion = socket_data
  var data = emotion[String(hour) + "_" + String(user.numEntries -1)];

  // var last = lineChart.data.datasets[0].data.length - 1;
  // console.log(lineChart.data.datasets)

  for (var i = 0; i < 5; i++) {
    // lineChart.data.datasets[i].data[last] = data[emotion_names[i]] * 100;
    lineChart.data.datasets[i].data.push(data[emotion_names[i]] * 100);
  }

  console.log(lineChart.data.datasets)
  lineChart.update();
  updateAverages(user);
  radarChart.update();
});
