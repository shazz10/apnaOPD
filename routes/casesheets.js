var express = require('express');
var router = express.Router();

var debug = require('debug')('apnaopd:server');

var Casesheet = require('../schemas/casesheetSchema');

/* GET users listing. */
router.get('/', function(req, res) {
  var casesheet = {
    habit: [{title : "1"},{title : "2"},{title : "3"}],
    habitat : [{title : "1"},{title : "2"},{title : "3"}]
  }
  res.send(casesheet);
});

module.exports = router;
