var express = require('express');
var router = express.Router();
var debug = require('debug')('apnaopd:server');

var Prescription = require('../schemas/prescription_retailerSchema');
var Retailer = require('../schemas/retailerSchema');
var Prescription_doctor =require('../schemas/prescription_doctorSchema');

/* GET users listing. */
router.get('/', function(req, res) {
  Prescription.find({},function (err,prescription) {
    if(err) throw err;
    res.send(prescription);
  });
});

router.post('/',async(req,res)=>{
  const prescription = new Prescription({
    patient_gid : req.body.patient_gid,
    prescription_link : req.body.prescription_link,
    comment: req.body.comment,
    address : req.body.address
  });
  const result= prescription.save();

  const retailers = await Retailer.find({
    'address.pincode' : req.body.address.pincode
  });
  console.log(retailers);
  retailers.forEach(function(element){
      var pid = {
        prescription_id : prescription._id
      }
      element.available_prescriptions.push(pid);
      element.save();
      });
  //debug(prescription);
  res.send(prescription);

});




module.exports = router;
