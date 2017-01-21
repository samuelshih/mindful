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
  'Sadness' : 'rgb(1, 73, 218)'
}
var hours = [];
for (var i=0; i<= 23; i++) {
    hours[i] = (i == 0) ? "12 AM" : ((i <12) ? i + " AM" : (i-12 || 12) + " PM");
}
var blank = "rgba(0, 0, 0, 0)"

var watson = require('watson-developer-cloud');
var alchemy_language = watson.alchemy_language({
	api_key: '4d9e0bf8ac8aeaba0b0edd7fcd04798f64c54a25'
});

//new Date()
//look this up

function User() {
	this.name = 'Tester';
	this.params = {};
	this.emotions = {}; /*
	{date: { anger: '0.090702',
  disgust: '0.077208',
  fear: '0.161844',
  joy: '0.497131',
  sadness: '0.238544',
 	entries: 1}}*/
};

var test = new User();
test.params['showSourceText'] = 1;

router.get('/test'/*another trigger*/, function(req, res, next){
	console.log(test.name);

	test.params['text'] = 'hello world';

	alchemy_language.emotion(test.params, function (err, res) {
		if (err)
			console.log('error:', err);
		else {
			var d = new Date();
			var date = String(d.getFullYear()) + "_" + String(d.getMonth()) + "_" + String(d.getDate()) + "_" + String(d.getHours());
			if (date in test.emotions) {
				for (var key in res['docEmotions']) {
					var sum = test.emotions[date]['entries']*Number(test.emotions[date][key]);
					test.emotions[date][key] = String((Number(res['docEmotions'][key]) + sum)/(test.emotions[date]['entries'] + 1));
				};
				test.emotions[date]['entries'] ++;
				console.log(test.emotions[date]);
			}
			else {
				test.emotions[date] = res['docEmotions'];
				test.emotions[date].entries = 1;
				console.log(test.emotions[date]);
			};
		}
	});
	res.render('index', { title: 'Testing' });
});
//});

/* GET home page. */

// ************************************
// ****** DATA ************************
// ************************************
var lineData = {
  labels: hours,
  datasets: [{
    label: 'Anger',
    data: [12, 19, 3, 17, 6, 3, 7, 5, 3, 1, 3, 7, 5, 3, 2, 4, 15, 37],
    borderColor: emotionsColors['Anger']
    backgroundColor: blank
  }, {
    label: 'Disgust',
    data: [2, 29, 5, 5, 2, 3, 10, 16, 3 , 5, 31, 21, 9],
    borderColor: emotionsColors['Disgust']
    backgroundColor: blank
  }]
}

var radarData = {
  labels: emotions,
  datasets: [{
    label: "Me",
    backgroundColor: "rgba(153,255,51,0.4)",
    borderColor: "rgba(153,255,51,1)",
    data: [10, 10, 10, 10, 10]
  }]
}

router.get('/home',  function(req, res, next) {
  res.render('index2', {
    title: 'Home', lineData: lineData, radarData: radarData
  });

router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' }); // render index.ejs
});

router.post('/newdata', function(req, res) {
	var d = new Date();
	var date = String(d.getFullYear()) + "_" + String(d.getMonth()) + "_" + String(d.getDate()) + "_" + String(d.getHours());
	test.params['text'] = req.body['hello'];  //CHANGE THE KEY FOR THE REQUEST BODY DEPENDING ON ERIC

	alchemy_language.emotion(test.params, function (err, res) {
		if (err)
			console.log('error:', err);
		else {
			if (date in test.emotions) {
				for (var key in res['docEmotions']) {
					var sum = test.emotions[date]['entries']*Number(test.emotions[date][key]);
					test.emotions[date][key] = String((Number(res['docEmotions'][key]) + sum)/(test.emotions[date]['entries'] + 1));
				};
				test.emotions[date]['entries'] ++;
				console.log(test.emotions[date]);
			}
			else {
				test.emotions[date] = res['docEmotions'];
				test.emotions[date].entries = 1;
				console.log(test.emotions[date]);
				req.app.io.emit('emotions', test.emotions);
			};
		};
	});
	res.end('Success');
});

router.get('/newdata', function(req, res) {
});


// Five line graphs on top of each other, different colors that
// show all the emotions

module.exports = router;

//get, post
