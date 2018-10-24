var express = require('express');
var router = express.Router();

var User = require('../schemas/userSchema');

/* GET users listing. */
router.get('/', function(req, res) {
  User.find({},function (err,user) {
    if(err) throw err;
    res.json(user)
  });
});


router.post('/',(req,res)=>{
  const user = new User({
    name : req.body.name,
    email : req.body.email
  });
  const result= user.save();

  res.json(user);
  debug(user);
});

module.exports = router;
