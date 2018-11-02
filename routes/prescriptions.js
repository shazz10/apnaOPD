var express = require('express');
var router = express.Router();

var Prescription = require('../schemas/prescriptionSchema');
var Retailer = require('../schemas/retailerSchema');

/* GET users listing. */
router.get('/', function(req, res) {
  Prescription.find({},function (err,prescription) {
    if(err) throw err;
    res.send(prescription);
  });
});



module.exports = router;
