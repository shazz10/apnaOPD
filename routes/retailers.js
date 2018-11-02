var express = require('express');
var router = express.Router();

var Retailer = require('../schemas/retailerSchema');

/* GET users listing. */
router.get('/', function(req, res) {
  Retailer.find({},function (err,retailer) {
    if(err) throw err;
    res.json(retailer)
  });
});

router.post('/',(req,res)=>{
  const retailer = new Retailer({
    name : req.body.name,
    email : req.body.email,
    gid : req.body.gid,
    phone_number : req.body.phone_number,
    office_number : req.body.office_number,
    address : req.body.address,
    pin : req.body.pin,
    gst_number : req.body.gst_number,
    certi_link : req.body.certi_link
  });
  const result= retailer.save();
  debug(retailer);
  res.send(retailer);

});

router.put('/presc_list/:gid',function(req, res) {
  Retailer.findOne({gid: req.params.gid}, function (err,retailer) {
    if(err)
    {
      throw err;
    }
    else if(retailer){
      retailer.available_prescriptions.push(req.body.available_prescriptions);
      retailer.save();
      res.send(retailer);
    }
    else {
      res.status(404).send("Record does not exist!");
    }
  });
});

module.exports = router;
