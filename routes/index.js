var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' }); // render index.ejs
});


router.get('/test', function(req, res, next) {
  res.render('index', { title: 'test' }); // render index.ejs
});

module.exports = router;
