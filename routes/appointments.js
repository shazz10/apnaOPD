var express = require('express');
var router = express.Router();

var Appointment = require('../schemas/appointmentSchema');
var Doctor = require('../schemas/doctorSchema');
var User = require('../schemas/userSchema');

/* GET users listing. */
router.get('/', function(req, res) {
  Appointment.find({},function (err,appointment) {
    if(err) throw err;
    res.json(appointment);
  });
});

router.post('/',async (req,res)=>{
  const appointment = new Appointment(req.body);
  
  const result = await appointment.save();

  await Doctor.findOne({gid:req.body.doctor_gid},function(err,doctor){
    console.log(appointment._id);
      if(err) throw err;
      if(doctor)
      {
        doctor.visiting.push(appointment._id);
        doctor.save();
        console.log(doctor.visiting);
      }
      else
        res.end("No such doctor is there");
  });

  await User.findOne({gid:req.body.patient_gid},function(err,user){
      if(err) throw err;
      if(user)
      {
        user.appointments.push(appointment._id);
        user.save();
        console.log(user.appointments);
      }
      else
        res.end("No such user is there");
  });


  res.send(appointment);
  
});

module.exports = router;
