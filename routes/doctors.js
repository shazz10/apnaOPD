var express = require('express');
var router = express.Router();

var Doctor = require('../schemas/doctorSchema');
var User = require('../schemas/userSchema');
/* GET users listing. */

//get doctors list for some department
router.get('/filter',async (req,res)=>{
  //var c= req.query.city;
  const doctors = await Doctor.find({
    fee : {$lte:parseInt(req.query.fee)},
    department : parseInt(req.query.department),
     //'address.city' : /.*c.*/i
  });

  // if(doctors && req.query.date)
  // {
  //   for(var i = doctors.length - 1; i >= 0; i--) {
  //     for(var j = doctors[i].time_slab.length - 1; j >= 0; j--) {
  //       if(doctors[i].time_slab[j].end <= req.query.date || !doctors[i].time_slab[j].available){
  //           doctors[i].time_slab.splice(j,1);
  //       }
  //     }
  //   }
  // }

  res.send(doctors);
});

//get unique doctor
router.get('/:gid', function(req, res) {
  Doctor.findOne({gid:req.params.gid},function (err,doctor) {
    if(err) throw err;
    res.json(doctor);
  });
});

//get visiting array
router.get('/visiting/:gid', function(req, res) {
  Doctor.findOne({gid:req.params.gid},function (err,doctor) {
    if(err) throw err;
    res.json(doctor.visiting);
  });
});


//get all doctors
router.get('/', function(req, res) {
  Doctor.find({},function (err,doctor) {
    if(err) throw err;
    res.json(doctor)
  });
});



//post new doctor into database
router.post('/',(req,res)=>{
  const doctor = new Doctor({
    name : req.body.name,
    email : req.body.email,
    gid : req.body.gid,
    phone_number : req.body.phone_number,
    office_number : req.body.office_number,
    address : req.body.address,
    degree : req.body.degree,
    speciality : req.body.speciality,
    fee : req.body.fee,
    department : req.body.department,
    reg_number : req.body.reg_number,
    certi_link : req.body.certi_link
  });
  const result= doctor.save();

  res.json(doctor);
  //debug(doctor);
});

//update time slab
router.put('/time_slab/:gid',function(req, res) {
  //console.log(req.body.time_slab);
  Doctor.findOne({gid: req.params.gid}, function (err,doctor) {
    if(err)
    {
      throw err;
    }
    else if(doctor){
      //console.log(req.body.time_slab);
      doctor.time_slab=req.body.time_slab;
      doctor.save();
      res.send(doctor);
    }
    else {
      res.status(404).send("Record does not exist!");
    }
  });
});



router.get('/time_slab/:gid',function(req, res) {
  //console.log(req.body.time_slab);
  Doctor.findOne({gid: req.params.gid}, function (err,doctor) {
    if(err)
    {
      throw err;
    }
    else if(doctor){
      res.send(doctor.time_slab);
    }
    else {
      res.status(404).send("Record does not exist!");
    }
  });
});

//Get available cities according to filter


router.get('/filter/city', async(req,res) => {
  var cities =[];
    await Doctor.find({},function(err,doctor){
        for (var i = doctor.length - 1; i >= 0; i--) {
          var city = doctor[i].address.city;
          if(city )
          cities.push(city);
        }
    });
    res.send(cities);
});


//update visitors array of a unique doctor after pressing next button 
router.put('/visiting/:doctor_gid/:sl_no', async(req,res)=>{
  await Doctor.findOne({gid:req.params.doctor_gid},function(err,doctor){
    if(err)
    {
      throw err;
    }
    else if(doctor){
      
//unique patient can book once
      var f=0;
      for (var i = doctor.visiting.length - 1; i >= 0; i--) {
        for (var j = doctor.visiting[i].patients.length - 1; j >= 0; j--) {
          if(doctor.visiting[i].patients[j].patient_gid == req.body.patients.patient_gid){
            //console.log("nana aur booking nai");
            f=1;
            break;
          }
        }
        if(f==1)
          break;
      }
      if(f==1)
        {res.send("nana aur booking nai");return 1;}
//ends

      var flag=0;
      doctor.visiting.forEach(function(element){
        if(element.sl_no == req.params.sl_no)
        { 
          flag=1;
          var count=0;
          doctor.time_slab.forEach(function(e){
            if(e.sl_no == element.sl_no && e.available)
            {
              count=e.patients_per-element.patients.length;
              //break;
            }
          });
            if(count>0){
            element.patients.push({
              time : new Date(),
              patient_gid:req.body.patients.patient_gid,
              casesheet_uid:req.body.patients.casesheet_uid,
            });
            doctor.save();
            
            //add appointments to user
            User.findOne({gid:req.body.patients.patient_gid},function(err,user){
              user.appointments.push({
                status : 0,
                doctor_gid : req.params.doctor_gid,
                casesheet_id : req.body.patients.casesheet_uid,
                time : req.params.sl_no
              });
              user.save();
            });
            //

            res.send(element);
          }
          else{
            res.send("Oops!! Please Refresh...")
          }
        }
      });
      if(flag==0)
      {
        var visit={sl_no:req.params.sl_no,patients:[]};
        doctor.visiting.push(visit);
        console.log("pushed new ");
        console.log(req.params.sl_no);
        doctor.visiting.forEach(function(element){
          if(element.sl_no == req.params.sl_no)
          { 
            flag=1;
            var count=0;
            doctor.time_slab.forEach(function(e){
              if(e.sl_no == element.sl_no && e.available)
              {
                count=e.patients_per-element.patients.length;
                //break;
              }
            });
              if(count>0){
              element.patients.push({
                time : new Date(),
                patient_gid:req.body.patients.patient_gid,
                casesheet_uid:req.body.patients.casesheet_uid,
              });
              doctor.save();
              
              //add appointments to user
              User.findOne({gid:req.body.patients.patient_gid},function(err,user){
                user.appointments.push({
                  status : 0,
                  doctor_gid : req.params.doctor_gid,
                  casesheet_id : req.body.patients.casesheet_uid,
                  time : req.params.sl_no
                });
                user.save();
              });
              //

              res.send(element);
            }
            else{
              res.send("Oops!! Please Refresh...")
            }
          }
      });

      }
    }
    else {
      res.status(404).send("Record does not exist!");
    }
  });
});


//delete from visitors array of a unique doctor after it visited or if patient cancels order
router.delete('/visiting/:doctor_gid/:sl_no/:visiting_id/:cancel', async(req,res)=>{
  await Doctor.findOne({gid:req.params.doctor_gid},function(err,doctor){
    if(err)
    {
      throw err;
    }
    else if(doctor){
      doctor.visiting.forEach(function(element){
        if(element.sl_no == req.params.sl_no)
        {
          element.patients.forEach(function(e){
              if(e._id == req.params.visiting_id)
                {
                  const index = element.patients.indexOf(e);
                  element.patients.splice(index,1);
                  
                  if(!parseInt(req.params.cancel)){
                    var h={
                      time: new Date(),
                      patient_gid: e.patient_gid,
                      casesheet_uid : e.casesheet_uid
                    }
                    console.log(h);
                    doctor.history.push(h);
                  }
                  doctor.save();
                  res.send(e);
                }
          });    
        }
      });
    }
    else {
      res.status(404).send("Record does not exist!");
    }
  });
});

module.exports = router;
