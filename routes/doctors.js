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
    gid : req.body.gid,
    phone_number : req.body.phone_number,
    office_number : req.body.office_number,
    address : req.body.address,
    degree : req.body.degree,
    speciality : req.body.speciality,
    fee : req.body.fee,
    department : req.body.department,
    reg_number : req.body.reg_number,
    certi_link : req.body.certi_link
  });
  const result= doctor.save();

  res.json(doctor);
  debug(doctor);
});

//Get according to filter
router.get('/filter',async (req,res)=>{
  //console.log(req.query);
  const doctors = await Doctor.find({fee : {$lte:parseInt(req.query.fee)}, department : parseInt(req.query.department)});

  res.send(doctors);
});

router.get('/filter/city', async(req,res) => {
  var cities =[];
    await Doctor.find({},function(err,doctor){
        for (var i = doctor.length - 1; i >= 0; i--) {
          var city = doctor[i].address.city;
          if(city )
          cities.push(city);
        }
    });
    res.send(cities);
});



module.exports = router;
