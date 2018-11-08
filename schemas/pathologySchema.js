const mongoose=require('mongoose');

const pathologySchema = new mongoose.Schema({
  name : String,
  email : String,
  gid : String,
  phone_number : String,
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
  available_prescriptions :[
  		{
  			prescription_id : String
  		}
  ],
  gst_number : String,
  certi_link : String
});

const pathologys= mongoose.model('Pathology',pathologySchema);
module.exports=pathologys;
