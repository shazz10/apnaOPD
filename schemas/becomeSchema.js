const mongoose=require('mongoose');

const becomeSchema = new mongoose.Schema({
	name : String,
  	email : String,
	gid : String,
	becomeDoctor : Boolean,
	becomeRetailer : Boolean,
	becomeManufacturer : Boolean,
	becomeWholesaler : Boolean,
	becomeSupplier : Boolean,
	verifyId : String,
	verifyCerti : String

});

const becomes= mongoose.model('Become',becomeSchema);
module.exports=becomes;
