var express = require('express');
var router = express.Router();

var Placed = require('../schemas/offerSchema');

/* GET users listing. */
router.get('/patient/:patient_gid', function(req, res) {
  Placed.find({patient_gid:req.params.patient_gid},function (err,placed) {
    if(err) throw err;
    res.json(placed)
  });
});

router.get('/retailer/:retailer_gid', function(req, res) {
  Placed.find({retailer_gid:req.params.retailer_gid},function (err,placed) {
    if(err) throw err;
    res.json(placed)
  });
});

router.post('/',(req,res)=>{
  const placed = new Placed({
  patient_gid : req.body.patient_gid,
  retailer_gid : req.body.retailer_gid,
  eoffer: req.body.eoffer,
  address_id : req.body.address_id,
  delivery_time : req.body.delivery_time,
  delivery_charge : req.body.delivery_charge,
  });
  const result= placed.save();

  res.json(placed);
  debug(placed);
});

router.put('/retailer/:_id',(req,res)=>{
    Placed.find({_id : req.params._id}, function(err,placed){
      if(err)
        throw err;
      placed.status=req.body.status;
      placed.save();
      res.send(placed);
    });
  });

module.exports = router;
