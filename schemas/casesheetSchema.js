const mongoose=require('mongoose');

const casesheetSchema = new mongoose.Schema({
	patient_gid: String,
	casesheet : [
      {
      	title : String,
      	time : Date,
        department : Number,
        //Cardio
        pulse : Number,
        rhythm : Number,
        neckveins : Number,
        chestpain : Number,
        respiration : Number,
        cardio_condition : Number,
        bleeding : Number,

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

      	}
	]
       
});

const casesheets= mongoose.model('Casesheet',casesheetSchema);
module.exports=casesheets;
