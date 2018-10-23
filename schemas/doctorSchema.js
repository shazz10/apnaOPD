const mongoose=require('mongoose');

const doctorSchema = new mongoose.Schema({
  name : String,
  email : String,
  phone_number : String,
  office_number : String,
  address : String,
  degree : String ,
  speciality : String,
  fee : Number,
  pin : Number ,
  certi_link : String
});

const doctors= mongoose.model('Doctor',doctorSchema);
module.exports=doctors;
