const mongoose=require('mongoose');

const appointmentSchema = new mongoose.Schema({
  
      date: Date,
      sl_no: Number,
      time : {type:Date,default:new Date()},
      patient_gid:String,
      casesheet_uid:String,
      doctor_gid:String    
});

const appointments= mongoose.model('Appointment',appointmentSchema);
module.exports=appointments;
