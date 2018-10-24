const mongoose=require('mongoose');

const wholesalerSchema = new mongoose.Schema({
  name : String,
  email : String,
  gid : String,
  phone_number : String,
  office_number : String,
  address : String,
  pin : Number ,
  gst_number : String,
  certi_link : String
});

const wholesalers= mongoose.model('Wholesaler',wholesalerSchema);
module.exports=wholesalers;
