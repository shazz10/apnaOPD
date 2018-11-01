const mongoose=require('mongoose');

const casesheetSchema = new mongoose.Schema({
	department : Number,
	

});

const casesheets= mongoose.model('Casesheet',casesheetSchema);
module.exports=casesheets;
