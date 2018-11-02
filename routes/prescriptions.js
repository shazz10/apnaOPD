var express = require('express');
var router = express.Router();

var Prescription = require('../schemas/prescriptionSchema');
var Retailer = require('../schemas/retailerSchema');

/* GET users listing. */
router.get('/',async (req,res)=>{
  //console.log(req.query);
  const prescriptions = await Prescription.find({
    address.pincode : parseInt(req.query.pincode)
  });
  res.send(prescriptions);
});

router.post('/',(req,res)=>{
  const prescription = new Prescription({
    patient_gid : req.body.patient_gid,
    prescription_link : req.body.prescription_link,
    comment: req.body.comment,
    address : req.body.address
  });
  const result= prescription.save();

  const retailers = await Retailer.find({
    address.pincode : req.body.address.pincode,
  });

  retailers.forEach(function(element){
      element.available_prescriptions.push(prescription.patient_gid);
      element.save();
      });

  res.json(prescription);
  debug(prescription);
});

router.get()


module.exports = router;
