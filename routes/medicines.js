var express = require('express');
var router = express.Router();

var Medicine = require('../schemas/medicineSchema');

/* GET users listing. */
router.get('/', function(req, res) {
  Medicine.find({},function (err,medicine) {
    if(err) throw err;
    res.json(medicine)
  });
});

router.post('/',(req,res)=>{
  const medicine = new Medicine({
    name : {
      chemical_name : req.body.name.chemical_name,
      brand_name : req.body.name.brand_name
    },
    rate : req.body.rate,
    dosage_form : req.body.dosage_form
  });
  const result= medicine.save();

  res.json(medicine);
  debug(medicine);
});

module.exports = router;
