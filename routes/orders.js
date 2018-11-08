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
      res.status(404).send({message:"Order not found"});
    }
  });
});

/* GET function ends*/

/*POST functions starts */

//upload prescription and send to all retailers
router.post('/:city',async(req,res)=>{
  console.log(req.body);
  const order = new Order({
    patient_gid : req.body[0].patient_gid,
    photo_prescription_link : req.body[0].photo_prescription_link,
    eprescription_id : req.body[0].eprescription_id,
    address : req.body[0].address
  });
  order.comment.unshift(req.body[0].comment);

  if(parseInt(req.params.city)){
    const retailers = await Retailer.find({
      'address.city' : req.body[0].address.city
    });
    console.log(retailers);
    retailers.forEach(function(element){
        element.orders.push(order._id);
        element.save();
      });
    const result= order.save();
    res.send(retailers);
  }
  else{
    const retailers = await Retailer.find({
      'address.pincode' : req.body[0].address.pincode
    });
    console.log(retailers);
    retailers.forEach(function(element){
        element.orders.push(order._id);
        element.save();
      });
    const result= order.save();
    res.send(retailers);
  }
});


/* POST functions starts */

/* PUT functions starts */

//retailers append offer to order
router.put('/:_id', async function(req, res) {
  await Order.findOne({_id:ObjectId(req.params._id)},function (err,order) {
    if(err) throw err;
    else if(order){
      if(order.status==0){
        order.offers.unshift(req.body.offers);
        order.save();
        res.send({message:"Offer placed"});
      }
      else{
        res.send({message:"Cannot place offer as order is confirmed"});
      }
    }
    else{
      res.status(404).send({message:"Order not found"});
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
        for (var i = order.offers.length - 1; i >= 0; i--) {
          if(order.offers[i].retailer_gid == req.params.retailer_gid){
            for (var j = order.offers.length - 1; j >= 0; j--) {
              if(order.offers[j].retailer_gid != req.params.retailer_gid){
                order.offers.splice(j,1);
              }
            }
            order.retailer_gid = order.offers[i].retailer_gid;
            order.status=1;
            order.save();
            flag=1;
            res.send({message:"Order Confirmed!"});
          }
        }
        if(flag==0){
          res.send({message:"No such retailer available"});
        }
      }
      else{
        res.send({message:"You dont have that privilege bro"});
      }
    }
    else{
      res.status(404).send({message:"Order not found"});
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
        //order delete from orders and update to history
        if(order.status==4){
          Retailer.findOne({gid : req.params.retailer_gid},function (err,retailer) {
            if(err) throw err;
            else if(retailer){
              var flag=0;
              for (var i = 0; i <= retailer.orders.length - 1; i++) {
                if(retailer.orders[i] == req.params._id ){
                  retailer.orders.splice(i,1);
                  retailer.history.unshift(req.params._id);
                  retailer.save();
                  flag=1;
                  break;
                }
              }
            }
          });
        }
        order.save();
        res.send(order);
      }
      else{
        res.send({message:"You dont have that privilege bro"});
      }
    }
    else{
      res.status(404).send({message:"Order not found"});
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
         res.send({message:"Order deleted"});
      }
      else{
        res.send({message:"You dont have that privilege bro"});
      }
    }
    else{
      res.status(404).send({message:"Order not found"});
    }
  });
});

/*DELETE function ends*/


module.exports = router;
