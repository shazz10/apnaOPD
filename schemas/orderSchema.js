const mongoose=require('mongoose');

const orderSchema = new mongoose.Schema({
	patient_gid : String,
	retailer_gid : String,
	photo_prescription_link : String,
    eprescription_id : String,
	comment: [String],
	address : {
        full_name : String,
        house_no: String,
        locality: String,
        landmark : String,
        city: String,
        state : String,
        pincode : String,
        phone_number : String
  		},
	time: {type : Date, default : new Date() },
	offers: [
				{
					retailer_gid : String,
					quotation:[
						{
							medicine : String,
							price : String,
							offered_price : String,
							dosage_per: String,
							dosage_day : String
						}
					],
					delivery_time : String,
					delivery_charge : String
				}
			],
	status : {type: Number, default: 0}
	
});

const orders= mongoose.model('Order',orderSchema);
module.exports=orders;
