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
// router.post('/',(req,res)=>{
//   const prescription = new Prescription({
//     patient_gid : req.body.patient_gid,
//     prescription_link : req.body.prescription_link,
//     comment: req.body.comment,
//     address : req.body.address
//   });
//   const result= prescription.save();

//   const retailers = await Retailer.find({
//     address.pincode : req.body.address.pincode,
//   });

//   retailers.forEach(function(element){
//       element.available_prescriptions.push(prescription.patient_gid);
//       element.save();
//       });

//   res.json(prescription);
//   debug(prescription);
// });



module.exports = router;
