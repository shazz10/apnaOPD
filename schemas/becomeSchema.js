const mongoose=require('mongoose');

const becomeSchema = new mongoose.Schema({
	name : String,
  	email : String,
	gid : String,
	address : {
        full_name : String,
        shop_name : String,
        house_no: String,
        locality: String,
        landmark : String,
        city: String,
        state : String,
        pincode : Number,
        phone_number : String
    },
	becomeDoctor : Boolean,
	becomePathologist : Boolean,
	becomeRetailer : Boolean,
	becomeManufacturer : Boolean,
	becomeWholesaler : Boolean,
	becomeSupplier : Boolean,
	verifyId : String,
	verifyCerti : String

});

const becomes= mongoose.model('Become',becomeSchema);
module.exports=becomes;
