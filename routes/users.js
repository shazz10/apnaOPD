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

router.get('/:gid', function(req,res) {
  User.findOne({gid: req.params.gid}, function (err,user) {
    if(err) throw err;
    res.json(user)
  });
});

/*
router.put('/:gid', (req,res) =>{
  User.findByIdAndUpdate(req.params.gid,{$set : req.body}, function(err,user){
    if(err) throw err;
    res.send('User updated')
  });
});
*/

router.post('/',(req,res)=>{

  const user = new User({
    name : req.body.name,
    email : req.body.email,
    imageUrl : req.body.imageUrl,
    gid : req.body.gid,
    address : req.body.address,
    isDoctor : req.body.isDoctor,
    isRetailer : req.body.isRetailer,
    isWholesaler : req.body.isWholesaler,
    isManufacturer : req.body.isManufacturer,
    isSupplier : req.body.isSupplier

  });
  
  const result =  user.save();

  res.json(user);
  debug(user);
  
});


module.exports = router;
