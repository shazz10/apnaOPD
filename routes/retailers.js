var express = require('express');
var router = express.Router();

var Retailer = require('../schemas/retailerSchema');

/* GET function starts */

router.get('/', function(req, res) {
  Retailer.find({},function (err,retailer) {
    if(err) throw err;
    res.json(retailer)
  });
});

router.get('/orders/:gid',function(req, res) {
  Retailer.findOne({gid: req.params.gid}, function (err,retailer) {
    if(err)
    {
      throw err;
    }
    else if(retailer){
      res.send(retailer.orders);
    }
    else {
      res.status(404).send("Record does not exist!");
    }
  });
});

/*GET function ends */

/*POST function starts */
router.post('/',(req,res)=>{
  const retailer = new Retailer({
    name : req.body.name,
    email : req.body.email,
    gid : req.body.gid,
    phone_number : req.body.phone_number,
    address : req.body.address,
    gst_number : req.body.gst_number,
    certi_link : req.body.certi_link
  });
  const result= retailer.save();
  //debug(retailer);
  res.send(retailer);

});

/*POST function ends */

/*PUT function starts*/

/*PUT function ends */

/*DELETE function starts */
//delete locally stored order id
router.delete('/orders/:retailer_gid/:order_id',function(req, res) {
  Retailer.findOne({gid: req.params.retailer_gid}, function (err,retailer) {
    if(err)
    {
      throw err;
    }
    else if(retailer){
      var flag=0;
      for (var i = retailer.orders.length - 1; i >= 0; i--) {
        if(retailer.orders[i] == req.params.order_id){
          retailer.orders.splice(i,1);
          retailer.save();
          flag=1;
          break;
        }
      }
      if(flag==1){
        res.send({message:"Order deleted"});
      }
      else{
        res.send({message:"No such Order"});
      }
    }
    else {
      res.status(404).send("Record does not exist!");
    }
  });
});
/*DELETE function ends */
module.exports = router;
