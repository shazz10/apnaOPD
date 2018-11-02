const mongoose=require('mongoose');

const wholesalerSchema = new mongoose.Schema({
  name : String,
  email : String,
  gid : String,
  phone_number : String,
  office_number : String,
  address : [
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
  ],
  gst_number : String,
  certi_link : String
});

const wholesalers= mongoose.model('Wholesaler',wholesalerSchema);
module.exports=wholesalers;
