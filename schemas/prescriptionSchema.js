const mongoose=require('mongoose');

const prescriptionSchema = new mongoose.Schema({
	patient_gid : String,
	prescription_link : String,
	comment: String,
	address : {
  			house_lane: String,
  			locality: String,
  			city: String,
  			district : String,
  			state : String,
  			pincode : Number,
        	phone_number : String
  		}

});

const prescriptions= mongoose.model('Prescription',prescriptionSchema);
module.exports=prescriptions;
