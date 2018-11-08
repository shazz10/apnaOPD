const mongoose=require('mongoose');

const doctorSchema = new mongoose.Schema({
  name : String,
  email : String,
  gid : String,
  phone_number : String,
  address : 
      {
        full_name : String,
        house_no: String,
        locality: String,
        landmark : String,
        city: String,
        state : String,
        pincode : Number,
        phone_number : String
      }
  ,
  degree : String ,
  fee : String,
  reg_number : String,
  certi_link : String,
  department : String,
  visiting:[String],
  history : [String],
  time_slab : [String]
});

const doctors= mongoose.model('Doctor',doctorSchema);
module.exports=doctors;
