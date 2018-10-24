var express = require('express');
var router = express.Router();

var Wholesaler = require('../schemas/wholesalerSchema');

/* GET users listing. */
router.get('/', function(req, res) {
  Wholesaler.find({},function (err,wholesaler) {
    if(err) throw err;
    res.json(wholesaler)
  });
});

router.post('/',(req,res)=>{
  const wholesaler = new Wholesaler({
    name : req.body.name,
    email : req.body.email,
    phone_number : req.body.phone_number,
    office_number : req.body.office_number,
    address : req.body.address,
    pin : req.body.pin,
    gst_number : req.body.gst_number,
    certi_link : req.body.certi_link
  });
  const result= wholesaler.save();

  res.json(wholesaler);
  debug(wholesaler);
});

module.exports = router;
