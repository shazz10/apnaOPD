var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/',(req,res)=>{
    res.send("Hello");
});

router.post('/',async function(req,res){
    console.log(req.files);
    console.log(req.body);
    var gid = req.body.gid;
    if (Object.keys(req.files).length == 0) {
        res.status(400).send('No files were uploaded.');
    }

    var prescription = req.files.prescription;
    
    var pathDir = "/home/suraj/apnaopd/apnaOPD/files/prescriptions/"+gid;
    if(!fs.existsSync(pathDir))
    {
        fs.mkdirSync(pathDir);
    }
    var path = pathDir + "/"+prescription.name;
    await prescription.mv(path,(err)=>{
        if (err)
        res.status(500).send(err);
    });

    var result = {
        "path" : path
    }

    res.send(path);
});

module.exports = router;
