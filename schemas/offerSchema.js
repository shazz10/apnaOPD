const mongoose=require('mongoose');

const offerSchema = new mongoose.Schema({
	patient_gid : String,
	retailer_gid : String,
	transaction_id : String,
	time:Date,
	eoffer:[
		{
			medicine : String,
			price : Number,
			offered_price : Number,
			dosage_per: Number,
			dosage_day : Number
		}
	],
	address_id : String,
	delivery_time : Date,
	delivery_charge : Number,
	status : Number
});

const offers= mongoose.model('Offer',offerSchema);
module.exports=offers;
