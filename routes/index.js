var express = require('express');
var router = express.Router();
var watson = require('watson-developer-cloud');
var alchemy_language = watson.alchemy_language({
  api_key: '5c96e6bf5474d65eabcf30283a33118672a66a6d'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(res)
  res.render('index', { title: 'helo world' }); // render index.ejs
});

router.get('/graph', function(req, res, next) {
  res.render('graph', { title: 'Graph'}); // render index.ejs
});

module.exports = router;
