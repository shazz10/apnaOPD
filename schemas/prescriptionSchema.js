const mongoose=require('mongoose');

const prescriptionSchema = new mongoose.Schema({
	patient_gid : String,
	prescription_link : String,
	comment: String,
	address : {
        full_name : String,
        house_no: String,
        locality: String,
        landmark : String
        city: String,
        state : String,
        pincode : Number,
        phone_number : String
  		}

});

const prescriptions= mongoose.model('Prescription',prescriptionSchema);
module.exports=prescriptions;
