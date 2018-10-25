var express = require('express');
var router = express.Router();

var debug = require('debug')('apnaopd:server');

var User = require('../schemas/userSchema');

/* GET users listing. */
router.get('/', function(req, res) {
  User.find({},function (err,user) {
    if(err) throw err;
    res.send(user);
  });
});

router.get('/:gid', function(req,res) {
  User.findOne({gid: req.params.gid}, function (err,user) {
    if(err) throw err;
    res.send(user);
  });
});


//push new address
router.put('/address/new/:gid',function(req, res) {
  User.findOne({gid: req.params.gid}, function (err,user) {
    if(err)
    {
      throw err;
    }
    else if(user){
      user.address.push(req.body.address);
      user.save();
      res.send(user);
    }
    else {
      res.status(404).send("Record does not exist!");
    }
  });
});

//delete address by _id
router.put('/address/delete/:gid/:_id',function(req, res) {
  User.findOne({gid: req.params.gid}, function (err,user) {
    if(err)
    {
      throw err;
    }
    else if(user){
      user.address.forEach(function(element){
        if(element._id == req.params._id)
        {
          const index = user.address.indexOf(element);
          user.address.splice(index,1);
          user.save();
          res.send(user);
        }
      });
    }
    else {
      res.status(404).send("Record does not exist!");
    }
  });
});




router.post('/',(req,res)=>{

  const user = new User({
    name : req.body.name,
    email : req.body.email,
    imageUrl : req.body.imageUrl,
    gid : req.body.gid,
    address : req.body.address,
    isDoctor : req.body.isDoctor,
    isRetailer : req.body.isRetailer,
    isWholeseller : req.body.isWholeseller,
    isManufacturer : req.body.isManufacturer,
    isSupplier : req.body.isSupplier

  });

  const result =  user.save();

  res.send(user);
  debug(user);

});


module.exports = router;
