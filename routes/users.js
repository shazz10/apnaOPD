var express = require('express');
bodyParser = require('body-parser').json();
var router = express.Router();

var debug = require('debug')('apnaopd:server');

var User = require('../schemas/userSchema');

/* GET functions starts*/

//Get user details
router.get('/:gid', function(req,res) {
  User.findOne({gid: req.params.gid}, function (err,user) {
    if(err) throw err;
    else if(user){
      var u={
        name : user.name,
        email : user.email,
        imageUrl : user.imageUrl,
        gid : user.gid,
        isPathologist : user.isPathologist,
        isDoctor : user.isDoctor,
        isRetailer : user.isRetailer,
        isWholesaler : user.isWholesaler,
        isManufacturer : user.isManufacturer,
        isSupplier : user.isSupplier
      }
      res.send(u);
    }
    else{
      res.send(null);
    }
  });
});


//send address of a unique gid
router.get('/address/:gid', function(req,res) {
  User.findOne({gid: req.params.gid}, function (err,user) {
    if(err) throw err;
    else if(user)
    res.send(user.address);
    else
      res.send(null);
  });
});


/* GET function ends*/

/* POST function starts */

router.post('/',bodyParser,(req,res)=>{

  const user = new User({
    name : req.body.name,
    email : req.body.email,
    imageUrl : req.body.imageUrl,
    gid : req.body.gid,

  });
  user.save(function(err){
    if(err) throw err;
  });

  res.send(user);

});

/*POST function ends */

/*PUT function starts*/

//update the user after it becomes something
router.put('/is/:gid',function(req,res){
  User.findOne({gid:req.params.gid}, function(err,user){
    if(err) throw err;
    else if(user){
      user['isPathologist'] = req.body.isPathologist;
      user['isDoctor'] = req.body.isDoctor;
      user['isRetailer'] = req.body.isRetailer;
      user['isWholesaler'] = req.body.isWholesaler;
      user['isManufacturer'] = req.body.isManufacturer;
      user['isSupplier'] = req.body.isSupplier;
      user.save();
      res.send(user);
    }
    else{
      res.status(404).send("Record doesnt exist!");
    }
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

/*PUT function ends */


module.exports = router;
