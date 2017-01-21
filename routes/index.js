var express = require('express');
var router = express.Router();
var watson = require('watson-developer-cloud');
var alchemy_language = watson.alchemy_language({
  api_key: '5c96e6bf5474d65eabcf30283a33118672a66a6d'
});

var emotions = ['Anger', 'Disgust', 'Fear', 'Joy', 'Sadness'];
var emotionsColors = {
  'Anger' : 'rgb(239, 0, 0)',
  'Disgust' : 'rgb(99, 1, 196)',
  'Fear': 'rgb(0, 0, 0)',
  'Joy' : 'rgb(5, 255, 46)',
  'sadness' : 'rgb(1, 73, 218)'
}
var hours = [];
for (var i=0; i<= 23; i++) {
    hours[i] = (i == 0) ? "12 AM" : ((i <12) ? i + " AM" : (i-12 || 12) + " PM");
}
var blank = "rgba(0, 0, 0, 0)"

/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log(res)
  res.render('index', { title: 'helo world' }); // render index.ejs
});


// Five line graphs on top of each other, different colors that
// show all the emotions
router.get('/lineGraph', function(req, res, next) {
  var lineData = {
    labels: hours,
    datasets: [{
      label: 'apples',
      data: [12, 19, 3, 17, 6, 3, 7],
      borderColor: "rgba(153,255,51,0.6)",
      backgroundColor: blank
    }, {
      label: 'oranges',
      data: [2, 29, 5, 5, 2, 3, 10],
      borderColor: "rgba(255,153,0,0.6)",
      backgroundColor: blank
    }]
  }

  res.render('lineGraph', { title: 'Graph', data: lineData});
});

router.get('/radarGraph', function(req, res, next) {
  var radarData = {
    labels: emotions,
    datasets: [{
      label: 'Me',
      backgroundColor: "rgba(153,255,51,0.4)",
      borderColor: "rgba(153,255,51,1)",
      data: [10, 10, 10, 10, 10]
    }]
  }

  res.render('radarGraph', { title: 'Graph', data: radarData});
});


router.get('/home',  function(req, res, next) {
  res.render('index', { title: 'Home', data: lineData});
});


module.exports = router;
