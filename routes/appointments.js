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
      res.send({message : "Appointment not found"});
    }
  });
});


//get all appointments of a specific user
router.get('/patient/:patient_gid', function(req, res) {
  Appointment.find({patient_gid :(req.params.patient_gid)},function (err,appointment) {
    if(err) throw err;
    else if(appointment){
      console.log(appointment);
      res.send(appointment);
    }
    else{
      res.send({message : "Appointment not found"});
    }
  });
});

//get all visiting appointments of doctor
router.get('/doctor/visiting/:doctor_gid', function(req, res) {
  Appointment.find({doctor_gid :(req.params.doctor_gid),status: 0 },function (err,appointment) {
    if(err) throw err;
    else if(appointment){
      res.send(appointment);
    }
    else{
      res.send({message : "Appointment not found"});
    }
  });
});

//get all history appointments of doctor
router.get('/doctor/history/:doctor_gid', function(req, res) {
  Appointment.find({doctor_gid :(req.params.doctor_gid),status: 2 },function (err,appointment) {
    if(err) throw err;
    else if(appointment){
      res.send(appointment);
    }
    else{
      res.send({message : "Appointment not found"});
    }
  });
});

/* GET function ends */

/* POST function starts */

//post new appointment and update in doctors visiting and users appoitments
router.post('/',async (req,res)=>{
  console.log(req.body);
  const appointment = new Appointment(req.body); 
  const result = await appointment.save();

  await Doctor.findOne({gid:req.body.doctor_gid},function(err,doctor){
    console.log(appointment._id);
      if(err) throw err;
      else if(doctor)
      {
        doctor.visiting.unshift(appointment._id);
        var str = req.body.time_slab.slice(0,5);
        for (var i = doctor.time_slab.length - 1; i >= 0; i--) {
          if(doctor.time_slab[i].slice(0,5) == str){
            //console.log(doctor.time_slab[i]);
            str = doctor.time_slab[i];
            doctor.time_slab.splice(i,1);
            doctor.time_slab.splice(i, 0, (parseInt(str)+1).toString());
            //console.log(doctor);
            doctor.save();
            break;
          }
        }
        
        console.log(doctor.visiting);
      }
      else
        res.send({message:"No such doctor is there"});
  });

  await User.findOne({gid:req.body.patient_gid},function(err,user){
      if(err) throw err;
      else if(user)
      {
        user.appointments.unshift(appointment._id);
        user.save();
        console.log(user.appointments);
      }
      else
        res.send({message:"No such user is there"});
  });

  res.send(appointment);
  
});

/* POST function ends */

/* PUT function starts */

//patient has reached the clinic
router.put('/status/:appointment_id/:patient_gid',async function(req, res) {

  Appointment.findOne({_id : ObjectId(req.params.appointment_id)},function (err,appointment) {
    if(err) throw err;
    else if(appointment){
      if(appointment.patient_gid == req.params.patient_gid){
        appointment.status = 1;
        appointment.save();
        res.send({message:"Patient has arrived"});
      }
      else{
        res.send({message:"You dont have that privilege bro"});
      }
    }
    else{
      res.send({message:"Appointment not found"});
    }
  });
});

//patient is diagnosed
router.put('/status/:appointment_id/:doctor_gid',function(req, res) {
  Appointment.findOne({_id : ObjectId(req.params.appointment_id)},function (err,appointment) {
    if(err) throw err;
    else if(appointment){
      if(appointment.status ==1){
        if(appointment.doctor_gid == req.params.doctor_gid){
          appointment.status = 2;
          appointment.save();
          res.send({message:"Patient is attended"});
        }
        else{
          res.send({message:"You dont have that privilege bro"});
        }
      }
      else{
        res.send({message:"Patient hasnt arrived yet"});
      }
    }
    else{
      res.send({message:"Appointment not found"});
    }
  });
});

/* PUT function ends */

/* DELETE function starts */

//apointment is canceled
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
          res.end({message:"No such doctor is there"});
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
          res.end({message:"No such user is there"});
      });

    }
    else{
      res.send({message:"No such appointment"});
    }
  });  
});

/* DELETE function ends */

module.exports = router;
