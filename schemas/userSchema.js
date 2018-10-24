const mongoose=require('mongoose');

const userSchema = new mongoose.Schema({
  name : String,
  email : String,
  imageUrl : String,
  isDoctor : {type : Boolean, default : false },
  isRetailer : {type : Boolean, default : false },
  isWholeseller : {type : Boolean, default : false },
  isManufacturer : {type : Boolean, default : false },
  isSupplier : {type : Boolean, default : false }
});

const users= mongoose.model('User',userSchema);
module.exports=users;
