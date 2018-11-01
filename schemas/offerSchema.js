const mongoose=require('mongoose');

const offerSchema = new mongoose.Schema({
	patient_gid : String,
	retailer_gid : String,
	offer:[
		{
			medicine : String,
			price : Number,
			offered_price : Number,
		}
	],
	delivery_time : Date,
	delivery_charge : Number
});

const offers= mongoose.model('Offer',offerSchema);
module.exports=offers;
