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
  casesheet : [
      {

        department : Number,
        //Cardio
        pulse : Number,
        rhythm : Number,
        neckveins : Number,
        chestpain : Number,
        respiration : Number,
        cardio_condition : Number,
        

        //GenetoUrinary
        general_survery : Number,
        genito_urinary : Number,
        genito_other : Number,

        //Eye
        eye_condition:Number,
        eye_other:Number,
        eye_misc : Number,

        //Ear
        ear_condition:Number,
        ear_other:Number,
        ear_misc : Number,
        //Neuro
        neuro_condition:Number,
        neuro_other:Number,
        neuro_misc : Number,
        behaviour: Number,
        sensation_abnormality : Number,

        //General
        habit : Number,
        habitat : Number,
        emotional_status : Number,
        pain :Number,
        site_of_problem : Number,
        vomiting : Number,
        problem_string : String,
        accident : String,
        fever : Number,

        comment : String

      }            
  ],
  offers : [
      {
        
      }
  ]
  isDoctor : {type : Boolean, default : false },
  isRetailer : {type : Boolean, default : false },
  isWholesaler : {type : Boolean, default : false },
  isManufacturer : {type : Boolean, default : false },
  isSupplier : {type : Boolean, default : false }
});

const users= mongoose.model('User',userSchema);
module.exports=users;
