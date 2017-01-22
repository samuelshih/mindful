// {"2017_0_21_19":{"anger":"0.081767","disgust":"0.050649","fear":"0.098549","joy":"0.567902","sadness":"0.239843","entries":1}}
var emotions = ['anger', 'disgust', 'fear', 'joy', 'sadness'];
var emotionsColors = {
  'anger' : 'rgb(239, 0, 0)',
  'disgust' : 'rgb(99, 1, 196)',
  'fear': 'rgb(0, 0, 0)',
  'joy' : 'rgb(5, 255, 46)',
  'sadness' : 'rgb(1, 73, 218)'
}

var hours = [];
for (var i=0; i<= 23; i++) {
    hours[i] = (i == 0) ? "12 AM" : ((i <12) ? i + " AM" : (i-12 || 12) + " PM");
}

var blank = "rgba(0, 0, 0, 0)"

// feels[0-4 for each feeling in alphabetical order][0-23 for hour]
var feels = {'anger': [], 'disgust': [], 'fear': [], 'joy': [], 'sadness' : []};
var date = new Date();
for (var hour = 0; hour < 24; hour++){
  var key = '2017_1_1_' + String(hour);
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
  labels: hours,
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

var radarData = {
  labels: emotions,
  datasets: [{
    label: "Me",
    backgroundColor: "rgba(153,255,51,0.4)",
    borderColor: "rgba(153,255,51,1)",
    data: [10, 10, 10, 10, 10]
  }]
}

var radarCtx = document.getElementById('emotionsRadarChart').getContext('2d');
var radarChart = new Chart(radarCtx, {
  type: 'radar',
  data: radarData,
  responsive: true
});
