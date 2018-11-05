const mongoose=require('mongoose');

const prescription_doctorSchema = new mongoose.Schema({
	patient_gid : String,
    prescription:[
        {   doctor_gid : String,
            casesheet_id : String,
            time : Date,
            prescription : [
                {
                    medicine : String,
                    quantity_per_day:Number,
                    for_days : Number
                }
            ],
            report : String
        }
    ]

});

const prescriptions= mongoose.model('Prescription_Doctor',prescription_doctorSchema);
module.exports=prescriptions;
