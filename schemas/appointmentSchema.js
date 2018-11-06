const mongoose=require('mongoose');

const appointmentSchema = new mongoose.Schema({
  
      time_slab: String,
      time : {type:Date,default:new Date()},
      patient_gid:String,
      casesheet_uid:String,
      doctor_gid:String,
      status : {type: Number, default: 0}

});

const appointments= mongoose.model('Appointment',appointmentSchema);
module.exports=appointments;
