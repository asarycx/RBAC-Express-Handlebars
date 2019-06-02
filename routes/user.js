var express = require('express')
var router = express.Router()

router.get('/',function(req,res,next){
    res.render('user/index');
})

router.get('/create',function(req,res,next){
    res.render('user/create');
})

module.exports = router