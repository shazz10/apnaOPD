var express = require('express');
var router = express.Router();

var debug = require('debug')('apnaopd:server');

var User = require('../schemas/userSchema');

/* GET users listing. */
router.get('/', function(req, res) {
  User.find({},function (err,user) {
    if(err) throw err;
    res.json(user)
  });
});


router.post('/',async (req,res)=>{

  const user = new User({
    name : req.body.name,
    email : req.body.email,
    imageUrl : req.body.imageUrl,
    address : req.body.address,
    isDoctor : req.body.isDoctor,
    isRetailer : req.body.isRetailer,
    isWholeseller : req.body.isWholeseller,
    isManufacturer : req.body.isManufacturer,
    isSupplier : req.body.isSupplier

  });
  debug(req.body);
  const result =  await user.save();

  res.json(user);
  
});

module.exports = router;
