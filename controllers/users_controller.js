const user = require('../models/user');
module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: 'User Profile'
    })
}

module.exports.login = function(req,res){
    return res.render('log_in',{
        title: 'Log In'
    })
}

module.exports.loginS = function(req,res){
    user.findOne({
        email : req.body.username,
        password: req.body.password
    }, function(err,doc){
        if(err){
            res.send("<h3>LogIn failed!!!</h3>");
            return;
        }
        if(doc!=null)
            res.send("<h3>LogIn Successfull</h3>");
        
        else {
            res.send("<h3>LogIn failed!!!</h3>");
        }
    })
}

module.exports.signup = function(req,res){
    
    return res.render('sign_up',{
        title:'Sign Up'
    })
}

module.exports.signupS = function(req,res){
    user.create({
        email: req.body.username,
        password : req.body.password
    })
    return res.send("<h3>Successfully Signed Up!!!</h3>");
}