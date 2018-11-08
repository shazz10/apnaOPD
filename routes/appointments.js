var express = require('express');
var router = express.Router();
const {ObjectId} = require('mongodb');
var Appointment = require('../schemas/appointmentSchema');
var Doctor = require('../schemas/doctorSchema');
var User = require('../schemas/userSchema');

/* GET function starts */

// get details of a unique appointment
router.get('/:appointment_id', function(req, res) {
  Appointment.findOne({_id : ObjectId(req.params.appointment_id)},function (err,appointment) {
    if(err) throw err;
    else if(appointment){
      res.send(appointment);
    }
    else{
      res.send("Appointment not found");
    }
  });
});


/* GET function stops */

/* POST function starts */

router.post('/',async (req,res)=>{
  const appointment = new Appointment(req.body); 
  const result = await appointment.save();

  await Doctor.findOne({gid:req.body.doctor_gid},function(err,doctor){
    console.log(appointment._id);
      if(err) throw err;
      else if(doctor)
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
      else if(user)
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

/* POST function ends */

/* PUT function starts */

router.put('/status/:appointment_id/:patient_gid',async function(req, res) {

  Appointment.findOne({_id : ObjectId(req.params.appointment_id)},function (err,appointment) {
    if(err) throw err;
    else if(appointment){
      if(appointment.patient_gid == req.params.patient_gid){
        appointment.status = 1;
        appointment.save();
        res.send("Patient has arrived");
      }
      else{
        res.send("You dont have that privilege bro")
      }
    }
    else{
      res.send("Appointment not found");
    }
  });
});

router.put('/status/:appointment_id/:doctor_gid',function(req, res) {
  Appointment.findOne({_id : ObjectId(req.params.appointment_id)},function (err,appointment) {
    if(err) throw err;
    else if(appointment){
      if(appointment.status ==1){
        if(appointment.doctor_gid == req.params.doctor_gid){
          appointment.status = 2;
          appointment.save();
          res.send("Patient is attended");
        }
        else{
          res.send("You dont have that privilege bro")
        }
      }
      else{
        res.send("Patient hasnt arrived yet");
      }
    }
    else{
      res.send("Appointment not found");
    }
  });
});

/* PUT function ends */

/* DELETE function starts */

router.delete('/:appointment_id',async (req,res)=>{

  await Appointment.findOne({_id : ObjectId(req.params.appointment_id)},async function (err,appointment) {
    if(err)
     throw err;
    else if(appointment){
      await Doctor.findOne({gid:appointment.doctor_gid},function(err,doctor){
        if(err) throw err;
        else if(doctor)
        {
          for (var i = doctor.visiting.length - 1; i >= 0; i--) {
            if(doctor.visiting[i] == req.params.appointment_id){
              doctor.visiting.splice(i,1);
              break;
            }
          }
          doctor.save();
        }
        else
          res.end("No such doctor is there");
      });

      await User.findOne({gid:req.body.patient_gid},function(err,user){
        if(err) throw err;
        else if(user)
        {
          for (var i = user.visiting.length - 1; i >= 0; i--) {
            if(user.visiting[i] == req.params.appointment_id){
              user.visiting.splice(i,1);
              break;
            }
          }
          user.save();
        }
        else
          res.end("No such user is there");
      });

    }
    else{
      res.send("No such appointment");
    }
  });  
});

/* DELETE function ends */

module.exports = router;
