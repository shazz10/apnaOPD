var express = require('express');
var router = express.Router();
var debug = require('debug')('apnaopd:server');

var Prescription = require('../schemas/prescription_retailerSchema');
var Retailer = require('../schemas/retailerSchema');
var Prescription_doctor =require('../schemas/prescription_doctorSchema');

/* GET users listing. */
router.post('/',async(req,res)=>{
  console.log(req.body);
  const prescription = new Prescription({
    patient_gid : req.body.patient_gid,
    photo_prescription_link : req.body.photo_prescription_link,
    doctor_prescription_id : req.body.doctor_prescription_id,
    comment: req.body.comment,
    address : req.body.address
  });
  const result= prescription.save();

  const retailers = await Retailer.find({
    'address.pincode' : req.body.address.pincode
  });
  //console.log(retailers);
  retailers.forEach(function(element){
      var pid = {
        prescription_id : prescription._id
      }
      element.available_prescriptions.push(pid);
      element.save();
      });
  res.send(prescription);
});


router.get('/:gid/:prescription_id', function(req, res) {
  Prescription.findOne({_id:req.params.prescription_id},function (err,prescription) {
    if(err) throw err;
    else if(prescription){
    res.send(prescription);}
    else{
      Retailer.findOne({gid : req.params.gid}, function(err,retailer){
        if(err) throw err;
        if(retailer){
          retailer.available_prescriptions.forEach(function(element){
              if(element.prescription_id == req.params.prescription_id)
              {
                const index = retailer.available_prescriptions.indexOf(element);
                retailer.available_prescriptions.splice(index,1);
                retailer.save();
                res.send("Delete Cache");
              }
          });
        }
      });
    }
  });

});




module.exports = router;
