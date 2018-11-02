const mongoose=require('mongoose');

const doctorSchema = new mongoose.Schema({
  name : String,
  email : String,
  gid : String,
  phone_number : String,
  office_number : String,
  address : 
      {
        full_name : String,
        house_no: String,
        locality: String,
        landmark : String
        city: String,
        state : String,
        pincode : Number,
        phone_number : String
      }
  ,
  degree : String ,
  speciality : String,
  fee : Number,
  reg_number : String,
  certi_link : String,
  department : Number,
  visiting:[
      {
        patient_gid:String,
        casesheet_uid:String
      }
  ],
  history : [
      {
        patient_gid: String,
        casesheet_uid : String
      }
  ],
  time_slab : [
    {
        available : Boolean,
        start : Date,
        end : Date,
        time_per : Number
    }
  ]
});

const doctors= mongoose.model('Doctor',doctorSchema);
module.exports=doctors;
