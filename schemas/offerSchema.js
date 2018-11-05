const mongoose=require('mongoose');

const offerSchema = new mongoose.Schema({
	patient_gid : String,
	offers : [
		{	retailer_gid : String,
			transaction_id : String,
			time: {type : Date, default : new Date() },
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
		}
	]
});

const offers= mongoose.model('Offer',offerSchema);
module.exports=offers;
