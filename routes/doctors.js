var express = require('express');
var router = express.Router();

var Doctor = require('../schemas/doctorSchema');
var User = require('../schemas/userSchema');


/* GET functions starts */

//get doctors list for some department
router.get('/filter',async (req,res)=>{
  const doctors = await Doctor.find({
    department : parseInt(req.query.department)
  });
  res.send(doctors);
});

//get unique doctor
router.get('/:gid', function(req, res) {
  Doctor.findOne({gid:req.params.gid},function (err,doctor) {
    if(err) throw err;
    else if(doctor){
      res.send(doctor);
    }
    else{
      res.send("Doctor not found");
    }
  });
});

//get visiting array
router.get('/visiting/:gid', function(req, res) {
  Doctor.findOne({gid:req.params.gid},function (err,doctor) {
    if(err) throw err;
    else if(doctor){
      res.send(doctor.visiting);
    }
    else{
      res.send({message:"No doctor found"});
    }
  });
});

//get all doctors
router.get('/', function(req, res) {
  Doctor.find({},function (err,doctor) {
    if(err) throw err;
    else if(doctor){
      res.send(doctor);
    }
    else{
      res.send({message:"No doctor found"});
    }
  });
});

//doctors time slab 
router.get('/time_slab/:gid',function(req, res) {
  //console.log(req.body.time_slab);
  Doctor.findOne({gid: req.params.gid}, function (err,doctor) {
    if(err)
    {
      throw err;
    }
    else if(doctor){
      console.log(doctor.time_slab);
      res.send(doctor.time_slab);
    }
    else {
      res.send("No such doctor available");
    }
  });
});

//Get available cities according to filter
router.get('/filter/city', async(req,res) => {
  var cities =[];
    await Doctor.find({},function(err,doctor){
        for (var i = doctor.length - 1; i >= 0; i--) {
          var city = doctor[i].address.city;
          if(city )
          cities.unshift(city);
        }
    });
    res.send(cities);
});


/* GET function ends */


/* POST function starts */

//post new doctor into database
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

  res.send(doctor);
  //debug(doctor);
});

/* POST function ends */

/* PUT function starts */

//update time slab
router.put('/time_slab/:doctor_gid',function(req, res) {
  //console.log(req.body.time_slab);
  Doctor.findOne({gid: req.params.doctor_gid}, function (err,doctor) {
    if(err)
    {
      throw err;
    }
    else if(doctor){
      console.log(req.body);
      doctor.time_slab = req.body;
      doctor.save();
      res.send(doctor);
    }
    else {
      res.send("Doctor does not exist");
    }
  });
});


/* PUT ends here */

/* DELETE ends here */

//delete from visitors array of a unique doctor after it visited 
router.delete('/visiting/:doctor_gid/:appointment_id', async(req,res)=>{
  await Doctor.findOne({gid:req.params.doctor_gid},function(err,doctor){
    if(err)
    {
      throw err;
    }
    else if(doctor){
      var flag=0;
      for (var i = doctor.visiting.length - 1; i >= 0; i--) {
        if(doctor.visiting[i] == req.params.appointment_id ){
          doctor.visiting.splice(i,1);
          doctor.history.unshift(req.params.appointment_id);
          doctor.save();
          flag=1;
          break;
        }
      }
      if(flag==0){
        res.send("Appointment not found");
      }
      else{
        res.send("Appointment added to history");
      }
    }
    else {
      res.status(404).send("Record does not exist!");
    }
  });
});

/* DELETE ends here */

module.exports = router;
