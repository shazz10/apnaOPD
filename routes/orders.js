var express = require('express');
var router = express.Router();

var Order = require('../schemas/orderSchema');
var Doctor = require('../schemas/doctorSchema');
var User = require('../schemas/userSchema');

/* GET users listing. */
router.get('/', function(req, res) {
  Order.find({},function (err,order) {
    if(err) throw err;
    res.json(order);
  });
});
router.get('/:id', function(req, res) {
  Order.findOne({_id:req.params.id},function (err,order) {
    if(err) throw err;
    res.json(order);
  });
});

router.post('/',async (req,res)=>{
  const order = new Order(req.body); 
  const result = await order.save();

  res.send(order);
  
});

module.exports = router;
