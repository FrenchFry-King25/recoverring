const express = require('express');
var router = express.Router();

router.get('/entry',function(req,res){
    res.render('entry');
});

router.post('/template', async function(req,res){
    let dict = {
        'name': '',
        'addiction':'',
        'plan':'',
        'd1':'',
        'd2':'',
        'd3':'',
        'd4':'',
        'w1':'',
        'w2':'',
        'w3':'',
        'w4':'',
        'm1':'',
        'm2':'',
        'm3':'',
        'm4':''
    };
    if('name' in req.body){
        dict.name = req.body.name;
    }
    const {split} = require('./controller');
    console.log(req.body);
    
    await new Promise( (resolve) => {
        split(req.body.prompt);
        resolve()
        dict.addiction = lines[0].substring(10);
        dict.plan = lines[3];
        dict.m1 = lines[8];
        dict.m2 = lines[9];
        dict.m3 = lines[10];
        dict.m4 = lines[11];
        dict.w1 = lines[14];
        dict.w2 = lines[15];
        dict.w3 = lines[16];
        dict.w4 = lines[17];
        dict.d1 = lines[20];
        dict.d2 = lines[21];
        dict.d3 = lines[22];
        dict.d4 = lines[23];
    });
    
   
    
    console.log(dict);
    res.render('template', dict);
});

module.exports = router;
