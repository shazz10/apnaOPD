const mongoose=require('mongoose');

const prescriptionSchema = new mongoose.Schema({
	patient_gid : String,
	photo_prescription_link : String,
    doctor_prescription_id : String,
	comment: String,
	address : {
        full_name : String,
        house_no: String,
        locality: String,
        landmark : String,
        city: String,
        state : String,
        pincode : Number,
        phone_number : String
  		}

});

const prescriptions= mongoose.model('Prescription_Retailer',prescriptionSchema);
module.exports=prescriptions;
