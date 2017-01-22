// {"2017_0_21_19":{"anger":"0.081767","disgust":"0.050649","fear":"0.098549","joy":"0.567902","sadness":"0.239843","entries":1}}
var emotions = ['Anger', 'Disgust', 'Fear', 'Joy', 'Sadness'];
var emotionsColors = {
  'Anger' : 'rgb(239, 0, 0)',
  'Disgust' : 'rgb(99, 1, 196)',
  'Fear': 'rgb(0, 0, 0)',
  'Joy' : 'rgb(5, 255, 46)',
  'Sadness' : 'rgb(1, 73, 218)'
}

var hours = [];
for (var i=0; i<= 23; i++) {
    hours[i] = (i == 0) ? "12 AM" : ((i <12) ? i + " AM" : (i-12 || 12) + " PM");
}

var blank = "rgba(0, 0, 0, 0)"

// *********************
// *** LINE GRAPH ******
// *********************

var lineData = {
  labels: hours,
  datasets: [{
    label: 'Anger',
    data: [12, 19, 3, 17, 6, 3, 7, 5, 3, 1, 3, 7, 5, 3, 2, 4, 15, 37],
    borderColor: emotionsColors['Anger'],
    backgroundColor: blank
  }, {
    label: 'Disgust',
    data: [2, 29, 5, 5, 2, 3, 10, 16, 3 , 5, 31, 21, 9],
    borderColor: emotionsColors['Disgust'],
    backgroundColor: blank
  }]
}

var lineCtx = document.getElementById('emotionsLineChart').getContext('2d');
var lineChart = new Chart(lineCtx, {
 type: 'line',
 data: lineData
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
  data: radarData
});
