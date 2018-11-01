const mongoose=require('mongoose');

const retailerSchema = new mongoose.Schema({
  name : String,
  email : String,
  gid : String,
  phone_number : String,
  office_number : String,
  address : {
		house_lane: String,
		locality: String,
		city: String,
		district : String,
		state : String,
		pincode : Number,
		},
  available_prescriptions :[
  		{
  			uid : String
  		}
  ],
  gst_number : String,
  certi_link : String
});

const retailers= mongoose.model('Retailer',retailerSchema);
module.exports=retailers;
