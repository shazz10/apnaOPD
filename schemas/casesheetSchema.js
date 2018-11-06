const mongoose=require('mongoose');

const casesheetSchema = new mongoose.Schema({

      	full_name : String,
        age : String,
      	title : String,
      	time : {type: Date, default : new Date()},
        department : String,

        //Cardio
        pulse : String,
        rhythm : String,
        neckveins : String,
        chestpain : String,
        respiration : String,
        cardio_condition : String,
        bleeding : String,

        //GenetoUrinary
        general_survery : String,
        genito_urinary : String,
        genito_other : String,

        //Eye
        eye_condition:String,
        eye_other:String,
        eye_misc : String,

        //Ear
        ear_condition:String,
        ear_other:String,
        ear_misc : String,
        //Neuro
        neuro_condition:String,
        neuro_other:String,
        neuro_misc : String,
        behaviour: String,
        sensation_abnormality : String,

        //General
        habit : String,
        habitat : String,
        emotional_status : String,
        pain :String,
        site_of_problem : String,
        vomiting : String,
        problem_string : String,
        accident : String,
        fever : String,
        
        comment : String
      	     
});

const casesheets= mongoose.model('Casesheet',casesheetSchema);
module.exports=casesheets;
