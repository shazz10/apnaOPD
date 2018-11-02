var express = require('express');
var router = express.Router();

var Offer = require('../schemas/offerSchema');

/* GET users listing. */
router.get('/:patient_gid', function(req, res) {
  Offer.find({patient_gid:req.params.patient_gid},function (err,offer) {
    if(err) throw err;
    res.json(offer)
  });
});

router.post('/',(req,res)=>{
  const offer = new Offer({
  patient_gid : req.body.patient_gid,
  retailer_gid : req.body.retailer_gid,
  eoffer: req.body.eoffer,
  address_id : req.body.address_id,
  delivery_time : req.body.delivery_time,
  delivery_charge : req.body.delivery_charge,
  });
  const result= offer.save();

  res.json(offer);
  debug(offer);
});

router.delete('/:patient_gid',(req,res)=>{
    Offer.find({patient_gid:req.params.patient_gid}, function(err,offer){
      if(err)
        throw err;
      offer.remove();
      res.send(offer);
    });
  });

module.exports = router;
