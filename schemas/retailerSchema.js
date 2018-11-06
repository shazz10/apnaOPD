const mongoose=require('mongoose');

const retailerSchema = new mongoose.Schema({
  name : String,
  email : String,
  gid : String,
  phone_number : String,
  address : {
        full_name : String,
        house_no: String,
        locality: String,
        landmark : String,
        city: String,
        state : String,
        pincode : Number,
        phone_number : String
		},
  orders :[String],
  gst_number : String,
  certi_link : String
});

const retailers= mongoose.model('Retailer',retailerSchema);
module.exports=retailers;
