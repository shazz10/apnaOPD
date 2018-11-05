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
  });
  offer.offers.push(req.body.offers);
  const result= offer.save();

  res.json(offer);
  //debug(offer);
});

router.delete('/delete/:patient_gid/:offer_id',(req,res)=>{
    Offer.find({patient_gid:req.params.patient_gid}, function(err,offer){
      if(err)
        throw err;
      offer.offers.forEach(function(element){
        if(element._id == req.params.offer_id){
          const index = offer.offers.indexOf(element);
          offer.offers.splice(index,1);
          offer.save();
          res.send(user);
        }
      });
    });
  });

module.exports = router;
