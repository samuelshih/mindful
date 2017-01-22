var express = require('express');
var router = express.Router();
var watson = require('watson-developer-cloud');
var alchemy_language = watson.alchemy_language({
  api_key: '5c96e6bf5474d65eabcf30283a33118672a66a6d'
});

var watson = require('watson-developer-cloud');
var alchemy_language = watson.alchemy_language({
	api_key: '4d9e0bf8ac8aeaba0b0edd7fcd04798f64c54a25'
});

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

/* GET home page. */
router.get('/',  function(req, res, next) {
  res.render('index2', {
    title: 'Home'
  });
});

router.post('/newdata', function(req, res) {
	var d = new Date();
	var date = String(d.getFullYear()) + "_" + String(d.getMonth()) + "_" + String(d.getDate()) + "_" + String(d.getHours());
	test.params['text'] = req.body['text'];  //CHANGE THE KEY FOR THE REQUEST BODY DEPENDING ON ERIC

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
			};
			req.app.io.emit('emotions', test.emotions);
		};
	});
	res.end('Success');
});

router.get('/newdata', function(req, res) {
});

module.exports = router;
