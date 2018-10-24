const mongoose=require('mongoose');

const retailerSchema = new mongoose.Schema({
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

const retailers= mongoose.model('Retailer',retailerSchema);
module.exports=retailers;
