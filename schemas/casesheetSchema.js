const mongoose=require('mongoose');

const casesheetSchema = new mongoose.Schema({
  habit : String,
  habitat : String
});

const casesheets= mongoose.model('Casesheet',casesheetSchema);
module.exports=casesheets;
