const mongoose=require('mongoose');

const prescriptionSchema = new mongoose.Schema({
	patient_gid : String,
	prescription_link : String,
	comment: String,
	address_id : String

});

const prescriptions= mongoose.model('Presciption',prescriptionSchema);
module.exports=prescriptions;
