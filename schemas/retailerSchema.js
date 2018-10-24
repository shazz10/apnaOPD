const mongoose=require('mongoose');

const retailerSchema = new mongoose.Schema({
  name : String,
  email : String,
  phone_number : String,
  office_number : String,
  address : String,
  pin : Number ,
  certi_link : String
});

const retailers= mongoose.model('Retailer',retailerSchema);
module.exports=retailers;
