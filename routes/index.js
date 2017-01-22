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
	this.params = {}; // string of text
	this.emotions = {}; /*
	{date: { anger: '0.090702',
  disgust: '0.077208',
  fear: '0.161844',
  joy: '0.497131',
  sadness: '0.238544',
 	entries: 1}}*/

  // date is of the form year_month_day
 	// entries is the # of strings per hour
};

var test = new User();
test.params['showSourceText'] = 1;

/* GET home page. */
router.get('/',  function(req, res, next) {
  res.render('index', {
    title: 'Home'
  });
});

/* post to /newdata */
router.post('/newdata', function(req, res) {
  // get today's date for date year_month_day key for emotions dictionary
	var d = new Date();
	var date = String(String(d.getHours()) + "_" + String(d.getMinutes()));
	test.params['text'] = req.body['text'];  //CHANGE THE KEY FOR THE REQUEST BODY DEPENDING ON ERIC

  // call watson with params
	alchemy_language.emotion(test.params, function (err, res) {
		if (err)
			console.log('error:', err);
    // if no error, update user's emotions with new data (res)
		else {
      // if we already have this date key in emotions, update emotions
			if (date in test.emotions) {
        // for each emotion, update value
				for (var key in res['docEmotions']) {
					var sum = test.emotions[date]['entries']*Number(test.emotions[date][key]);
					test.emotions[date][key] = String((Number(res['docEmotions'][key]) + sum)/(test.emotions[date]['entries'] + 1));
				};
        // increment entries and log to console
				test.emotions[date]['entries'] ++;
				console.log(test.emotions[date]);
			}
      // if we haven't added this date key to emotions yet, add
			else {
				test.emotions[date] = res['docEmotions'];
				test.emotions[date].entries = 1;
				console.log(test.emotions[date]);
			};
      // emit emotions to socket
			req.app.io.emit('emotions', test.emotions);
		};
	});
	res.end('Success');
});

router.get('/newdata', function(req, res) {
});

module.exports = router;
