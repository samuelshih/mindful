// {"2017_0_21_19":{"anger":"0.081767","disgust":"0.050649","fear":"0.098549","joy":"0.567902","sadness":"0.239843","entries":1}}
var emotion_names = ['anger', 'disgust', 'fear', 'joy', 'sadness'];
var emotionsColors = {
  'anger' : 'rgb(239, 0, 0)',
  'disgust' : 'rgb(99, 1, 196)',
  'fear': 'rgb(0, 0, 0)',
  'joy' : 'rgb(5, 255, 46)',
  'sadness' : 'rgb(1, 73, 218)'
}

var minutes = [];
for (var i=0; i< 60; i++) {
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
var feels = {'anger': [], 'disgust': [], 'fear': [], 'joy': [], 'sadness' : []};
for (var min = 0; min < 60; min++){
  var key = String(hour) + '_' + String(min);
  if (key in socket_data){
    feels['anger'].push(Number(socket_data[key]['anger'])*100);
    feels['disgust'].push(Number(socket_data[key]['disgust'])*100);
    feels['fear'].push(Number(socket_data[key]['fear'])*100);
    feels['joy'].push(Number(socket_data[key]['joy'])*100);
    feels['sadness'].push(Number(socket_data[key]['sadness'])*100);
  }
  else{
    feels['anger'].push(0.0);
    feels['disgust'].push(0.0);
    feels['fear'].push(0.0);
    feels['joy'].push(0.0);
    feels['sadness'].push(0.0);
  }
};

var lineData = {
  labels: minutes,
  datasets: [{
      label: 'anger',
      data: feels['anger'],
      borderColor: emotionsColors['anger'],
      backgroundColor: blank
    }, {
      label: 'disgust',
      data: feels['disgust'],
      borderColor: emotionsColors['disgust'],
      backgroundColor: blank
    }, {
      label: 'fear',
      data: feels['fear'],
      borderColor: emotionsColors['fear'],
      backgroundColor: blank
    }, {
      label: 'joy',
      data: feels['joy'],
      borderColor: emotionsColors['joy'],
      backgroundColor: blank
    }, {
      label: 'sadness',
      data: feels['sadness'],
      borderColor: emotionsColors['sadness'],
      backgroundColor: blank
    }]
};

var lineCtx = document.getElementById('emotionsLineChart').getContext('2d');
var lineChart = new Chart(lineCtx, {
 type: 'line',
 data: lineData,
 responsive: true
});

// *********************
// *** RADAR GRAPH *****
// *********************

var averages = [0, 0, 0, 0, 0];
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
averages[0] = averages[0] / total;
averages[1] = averages[1] / total;
averages[2] = averages[2] / total;
averages[3] = averages[3] / total;
averages[4] = averages[4] / total;

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
  responsive: true
});

var socket = io();

socket.on('emotions', function(emotion){
  console.log(JSON.stringify(emotion));

  var data = emotion[Object.keys(emotion)[0]];

  var last = lineChart.data.datasets[0].data.length - 1;
  console.log(lineChart.data.datasets)

  for (var i = 0; i < 5; i++) {
    lineChart.data.datasets[i].data[last] = data[emotion_names[i]] * 100;
    // console.log(emotion_names[i]);
    // console.log(data[emotion_names[i]]);
  }

  console.log(lineChart.data.datasets)
  lineChart.update();
});
