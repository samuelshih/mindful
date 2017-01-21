var express = require('express');
var router = express.Router();
var watson = require('watson-developer-cloud');
var alchemy_language = watson.alchemy_language({
	api_key: '4d9e0bf8ac8aeaba0b0edd7fcd04798f64c54a25'
});

//new Date()
//look this up

var parameters = {
	text: 'Im so angry!'
};

function User() {
	this.name = 'Tester';
	this.info = {'2017_01_20_00': 'I am sad', '2017_01_20_01': 'I am angry',
								'2017_01_20_02': 'I am happy', '2017_01_20_03': 'I am disgusted',
								'2017_01_20_04': 'I am afraid'};
	this.emotions = {}; /*
	{date: { anger: '0.090702',
  disgust: '0.077208',
  fear: '0.161844',
  joy: '0.497131',
  sadness: '0.238544',
 	entries: 1}}*/
};

//io.on(/*some trigger*/, function(socket){
	router.get('/test'/*another trigger*/, function(req, res, next){
		test = new User();
		console.log(test.name);
		for (var key in test.info) {
			alchemy_language.emotion({text: test.info[key], showSourceText: 1}, function (err, res) {
				if (err)
					console.log('error:', err);
				else
					var d = new Date()
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
	  	});
		};
		res.render('index', { title: 'Testing' });
	});
//});

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' }); // render index.ejs
});

var c = 0;

router.post('/newdata', function(req, res) {
	c += 1;
	res.end('yay');
});

router.get('/newdata', function(req, res) {
	res.end(String(c));
});

module.exports = router;

//get, post
