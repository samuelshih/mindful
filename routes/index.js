var express = require('express');
var router = express.Router();

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
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' }); // render index.ejs
});

var c = 0;

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
	res.end('yay');
});

router.get('/newdata', function(req, res) {
	res.end(String(c));
});

module.exports = router;

//get, post
