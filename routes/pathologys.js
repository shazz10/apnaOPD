var express = require('express');
var router = express.Router();

var Pathology = require('../schemas/pathologySchema');

/* GET users listing. */
router.get('/', function(req, res) {
  Pathology.find({},function (err,pathology) {
    if(err) throw err;
    res.json(pathology)
  });
});

router.post('/',(req,res)=>{
  const pathology = new Pathology({
    name : req.body.name,
    email : req.body.email,
    gid : req.body.gid,
    phone_number : req.body.phone_number,
    office_number : req.body.office_number,
    address : req.body.address,
    gst_number : req.body.gst_number,
    certi_link : req.body.certi_link
  });
  const result= pathology.save();
  //debug(pathology);
  res.send(pathology);

});

router.get('/presc_list/:gid',function(req, res) {
  Pathology.findOne({gid: req.params.gid}, function (err,pathology) {
    if(err)
    {
      throw err;
    }
    else if(pathology){
      res.send(pathology.available_prescriptions);
    }
    else {
      res.status(404).send("Record does not exist!");
    }
  });
});

//delete locally stored prescription id
router.delete('/presc_list/:gid/:prescription_id',function(req, res) {
  Pathology.findOne({gid: req.params.gid}, function (err,pathology) {
    if(err)
    {
      throw err;
    }
    else if(pathology){
      pathology.available_prescriptions.forEach(function(element){
        if(element.prescription_id == req.params.prescription_id)
        {
          const index = pathology.available_prescriptions.indexOf(element);
          pathology.available_prescriptions.splice(index,1);
          pathology.save();
          res.send(pathology);
        }
      });
    }
    else {
      res.status(404).send("Record does not exist!");
    }
  });
});

module.exports = router;
