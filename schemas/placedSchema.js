const mongoose=require('mongoose');

const placedSchema = new mongoose.Schema({
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
	status : Number

});

const placeds= mongoose.model('Placed',placedSchema);
module.exports=placeds;
