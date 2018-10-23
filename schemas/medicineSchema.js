const mongoose=require('mongoose');

const medicineSchema = new mongoose.Schema({
  name : {
    chemical_name : String,
    brand_name : String
  },
  rate : Number,
  dosage_form : String
});

const medicines= mongoose.model('Medicine',medicineSchema);
module.exports=medicines;
