var express = require('express');
var router = express.Router();

var Prescription = require('../schemas/prescriptionSchema');

/* GET users listing. */
router.get('/', function(req, res) {
  Prescription.find({},function (err,prescription) {
    if(err) throw err;
    res.json(prescription)
  });
});

router.post('/',(req,res)=>{
  const prescription = new Prescription({
    patient_gid : req.body.patient_gid,
    prescription_link : req.body.prescription_link,
    comment: req.body.comment,
    address_id : req.body.address_id
  });
  const result= prescription.save();

  res.json(prescription);
  debug(prescription);
});




module.exports = router;
