var express = require('express')
var router = express.Router()

router.get('/',function(req,res,next){
    res.send('<h1>Welcome!!</div><a href="/login">Login</a>');
})

/**
 * 
 * PART: View for login
 * 
 */
router.get('/login',function(req,res,next){
    res.render('auth/login');
})

/**
 * 
 * PART: Login Process
 * 
 */
router.post('/login',function(req,res,next){
    res.render('auth/login');
})

module.exports = router