var express = require('express');
var router = express.Router();

var Doctor = require('../schemas/doctorSchema');

/* GET users listing. */
router.get('/', function(req, res) {
  Doctor.find({},function (err,doctor) {
    if(err) throw err;
    res.json(doctor)
  });
});

router.post('/',(req,res)=>{
  const doctor = new Doctor({
    name : req.body.name,
    email : req.body.email,
    phone_number : req.body.phone_number,
    office_number : req.body.office_number,
    address : req.body.address,
    degree : req.body.degree,
    speciality : req.body.speciality,
    fee : req.body.fee,
    pin : req.body.pin,
    certi_link : req.body.certi_link
  });
  const result= doctor.save();

  res.json(doctor);
  debug(doctor);
});

module.exports = router;
