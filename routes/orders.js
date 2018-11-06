var express = require('express');
const {ObjectId} = require('mongodb');
var router = express.Router();

var Order = require('../schemas/orderSchema');
var Doctor = require('../schemas/doctorSchema');
var User = require('../schemas/userSchema');
var Retailer = require('../schemas/retailerSchema');

/* GET functions starts */
//get specific order
router.get('/:_id', function(req, res) {
  Order.findOne({_id:ObjectId(req.params._id)},function (err,order) {
    if(err) throw err;
    else if(order){
      res.send(order);
    }
    else{
      res.status(404).send("Order not found");
    }
  });
});

/* GET function ends*/

/*POST functions starts */

//upload prescription and send to all retailers
router.post('/',async(req,res)=>{
  console.log(req.body);
  const order = new Order({
    patient_gid : req.body.patient_gid,
    photo_prescription_link : req.body.photo_prescription_link,
    eprescription_id : req.body.eprescription_id,
    address : req.body.address
  });
  order.comment.push(req.body.comment);
  const result= order.save();

  const retailers = await Retailer.find({
    'address.pincode' : req.body.address.pincode
  });
  console.log(retailers);
  retailers.forEach(function(element){
      element.available_orders.push(order._id);
      element.save();
      });
  res.send(retailers);
});


/* POST functions starts */

/* PUT functions starts */

//retailers append offer to order
router.put('/:_id', async function(req, res) {
  await Order.findOne({_id:ObjectId(req.params._id)},function (err,order) {
    if(err) throw err;
    else if(order){
      if(order.status==0){
        order.offers.push(req.body);
        res.send("Offer placed");
      }
      else{
        res.send("Cannot place offer as order is confirmed");
      }
    }
    else{
      res.status(404).send("Order not found");
    }
  });
});

//accept offer of a specific retailer
router.put('/:_id/:patient_gid/:retailer_gid', async function(req, res) {
  await Order.findOne({_id:ObjectId(req.params._id)},function (err,order) {
    if(err) throw err;
    else if(order){
      if(order.patient_gid == req.params.patient_gid){
        var flag=0;
        order.offers.forEach(function(element){
          if(element.retailer_gid == req.params.retailer_gid){
            order.offers.forEach(function(e){
              if(e.retailer_gid != req.params.retailer_gid){
                order.offers.splice(order.offers.indexOf(e),1);
              }
            });
            order.retailer_gid = element.retailer_gid;
            order.status=1;
            order.save();
            flag=1;
            res.send("Order confirmed");
          }
        });
        if(flag==0){
          res.send("No such retailer available");
        }
      }
      else{
        res.send("You dont have that privilege bro");
      }
    }
    else{
      res.status(404).send("Order not found");
    }
  });
});

//update status of order from retailer side
router.put('/:_id/:retailer_gid/:status', async function(req, res) {
  await Order.findOne({_id:ObjectId(req.params._id)},function (err,order) {
    if(err) throw err;
    else if(order){
      if(order.retailer_gid == req.params.retailer_gid){
        order.status=parseInt(req.params.status);
      }
      else{
        res.send("You dont have that privilege bro");
      }
    }
    else{
      res.status(404).send("Order not found");
    }
  });
});


/* PUT function ends */

/*DELETE function starts */

router.delete('/:_id/:patient_gid', async function(req, res) {
  await Order.findOne({_id:ObjectId(req.params._id)},function (err,order) {
    if(err) throw err;
    else if(order){
      if(order.patient_gid == req.params.patient_gid){
         order.remove();
         res.send("Order deleted");
      }
      else{
        res.send("You dont have that privilege bro");
      }
    }
    else{
      res.status(404).send("Order not found");
    }
  });
});

/*DELETE function ends*/


module.exports = router;
