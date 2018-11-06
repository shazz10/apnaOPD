var express = require('express');
var router = express.Router();

var debug = require('debug')('apnaopd:server');

var User = require('../schemas/userSchema');
var Casesheet = require('../schemas/casesheetSchema');

/* GET function starts */
router.get('/', function(req, res) {
  var casesheet = {
    department : [{id: 1,name :"",desc :"",image_link :""}] ,
    rhythm_cardio: [{id:1,title : "Fast"},{id:2,title : "Slow"},{id:3,title : "Normal"}],
    neck_cardio: [{id:1,title : "Normal"},{id:2,title : "Engorged"}],
    chest_cardio: [{id:1,title : "No"},{id:2,title : "Slight"},{id:3,title : "Pulsating"}],
    resp_cardio: [{id:1,title : "Normal"},{id:2,title : "Deep Breath"},{id:3,title : "Difficulty / Fast"}],
    bleed_cardio: [{id:1,title : "Nose"},{id:2,title : "Mouth"},{id:3,title : "No"}],
    condition_cardio: [{id:1,title : "Normal"},{id:2,title : "Faint"},{id:3,title : "Weakness"}],
    condition_ear: [{id:1,title : "Itching"},{id:2,title : "Pain"},{id:3,title : "Pus Formation"},{id:4 , title : "Water Discharge"},{id:5, title:"Normal"}],
    other_ear: [{id:1,title : "Buzzing Sounds"},{id:2,title : "Dizziness"},{id:3,title : "Injury"},{id:4,title:"Normal"}],
    misc_ear: [{id:1,title : "Hearing Loss"},{id:2,title : "Abnormal Walking"},{id:3,title : "Normal"}],
    condition_eye: [{id:1,title : "Pain"},{id:2,title : "Burning"},{id:3,title : "Itching"},{id:4,title:"Water Discharge"},{id:4, title:"Normal"}],
    other_eye: [{id:1,title : "Redness"},{id:2,title : "Injury"},{id:3,title : "Swelling"}],
    misc_eye: [{id:1,title : "Blindness"},{id:2,title : "Loss of Peripheral Vision"},{id:3,title : "Dark Spot in Vision"}],
    general_genito: [{id:1,title : "Face Puffiness"},{id:2,title : "Oedema"},{id:3,title : "Scabbies"},{id:4,title : "N.A."}],
    genito_genito: [{id:1,title : "Pain in Testis"},{id:2,title : "Scrotal Oedema"},{id:3,title : "Pain and Burning in Urination"},{id:4,title : "N.A."}],
	  other_genito: [{id:1,title : "Fever"},{id:2,title : "Tenderness"}],
    condition_neuro: [{id:1,title : "Consious"},{id:2,title : "Sub-Consious"},{id:3,title : "Normal"}],
    behavioural_neuro: [{id:1,title : "Speech Deject"},{id:2,title : "Anxiety"},{id:3,title : "Depression"}],
    sensation_neuro: [{id:1,title : "Abnormal Smell"},{id:2,title : "Visual Abnormality"},{id:3,title : "Deviation of Angle of Mouth"},{id:4,title : "Loss of Taste"},{id:5,title : "Deafness"},{id:6,title : "Hoarseness of Voice"},{id:7,title : "Normal"}],
    other_neuro: [{id:1,title : "Weakness"},{id:2,title : "Pain in Muscle"},{id:3,title : "Swelling of Muscle"},{id:4,title : "Headache"},{id:5,title : "Inco-ordination"}],
    misc_neuro: [{id:1,title : "Fever"},{id:2,title : "Pain in Neck"}],
    habit_gen: [{id:1,title : "Tobacco Chewing"},{id:2,title : "Alcoholic"},{id:3,title : "Nail Biting"},{id:4,title : "Late Night Sleep"},{id:5,title : "Fast Food Eaters"},{id:6,title : "Smoking"}],
    habitat_gen: [{id:1,title : "Hot"},{id:2,title : "Cold"},{id:3,title : "Humid"},{id:4,title : "Dusty"},{id:5,title : "Polluted"}],
    emotional_gen: [{id:1,title : "Happy"},{id:2,title : "Normal"},{id:3,title : "Excited"},{id:4,title : "Depressed"}],
    pain_gen: [{id:1,title : "Mild"},{id:2,title : "Moderate"},{id:3,title : "Severe"},{id:4,title : "Burning"},{id:5,title : "Pulsating"}],
    site_gen: [{id:1,title : "Front Head"},{id:2,title : "Back Head"},{id:3,title : "Left Shoulder"},{id:4,title : "Left Hand Upper"},{id:5,title : "Left Hand Lower"},{id:6,title : "Right Hand Upper"},{id:7,title : "Right Hand Lower"},{id:8,title : "Left Chest"},{id:9,title : "Right Chest"},{id:10,title : "Left Back Chest"},{id:11,title : "Right Back Chest"}],
    vomit_gen: [{id:1,title : "Yes"},{id:2,title : "No"},{id:3,title : "Nausea"}],   
  }
  res.send(casesheet);
});

//get unique casesheet of specific doctor
router.get('/:gid/:casesheet_uid',async function(req, res) {
    
  User.findOne({gid: req.params.gid}, function (err,user) {
    if(err)
    {
      throw err;
    }
    else if(user){
      var flag=0;
      for (var i = user.casesheet.length - 1; i >= 0; i--) {
        if(user.casesheet[i] == null)
          continue;
        if(user.casesheet[i]._id == req.params.casesheet_uid){
          res.send(user.casesheet[i]);
          flag=1;
          break;
        }
      }
      if(flag==0)
        res.status(404).send("Casesheet not found")
    }
    else {
      res.status(404).send("No user found");
    }
  });
});


/*GET function ends*/

/*PUT function starts */

router.put('/:gid',function(req, res) {

  console.log(req.body);
  
  User.findOne({gid: req.params.gid}, function (err,user) {
    if(err)
    {
      throw err;
    }
    else if(user){
      const casesheet = new Casesheet(req.body);
      casesheet.save();
      user.casesheets.push(casesheet._id);
      user.save();  
      res.send(casesheet);
    }
    else {
      res.status(404).send("No user found");
    }
  });

});

/*PUT function ends*/


module.exports = router;
