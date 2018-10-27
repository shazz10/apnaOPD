const mongoose=require('mongoose');

const userSchema = new mongoose.Schema({
  name : String,
  email : String,
  imageUrl : String,
  gid : String,
  address : [
  		{
  			house_lane: String,
  			locality: String,
  			city: String,
  			district : String,
  			state : String,
  			pincode : Number,
        phone_number : String
  		}
  ],
  isDoctor : {type : Boolean, default : false },
  isRetailer : {type : Boolean, default : false },
  isWholesaler : {type : Boolean, default : false },
  isManufacturer : {type : Boolean, default : false },
  isSupplier : {type : Boolean, default : false }
});

const users= mongoose.model('User',userSchema);
module.exports=users;
