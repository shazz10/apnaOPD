var express = require('express');
var router = express.Router();

var Become = require('../schemas/becomeSchema');

/* GET function starts */
router.get('/', function(req, res) {
  Become.find({},function (err,become) {
    if(err) throw err;
    res.json(become)
  });
});
/* GET function starts */

/*POST function starts */
router.post('/',(req,res)=>{
  const become = new Become({
    name : req.body.name,
    email : req.body.email,
    gid : req.body.gid,
    becomeDoctor : req.body.becomeDoctor,
    becomeRetailer : req.body.becomeRetailer,
    becomeManufacturer : req.body.becomeManufacturer,
    becomeWholesaler : req.body.becomeWholesaler,
    becomeSupplier : req.body.becomeSupplier,
    verifyId : req.body.verifyId,
    verifyCerti : req.body.verifyCerti
  });

  const result= become.save();

  res.send(become);
  
});

/* POST function ends */

/* PUT function starts */
/* PUT function ends */

/* DELETE function starts */
router.delete('/:gid',(req,res)=>{
    Become.findOne({gid:req.params.gid}, function(err,become){
      if(err)
        throw err;
      become.remove();
      res.send(become);
    });
});
 /* DELETE function ends */

module.exports = router;
