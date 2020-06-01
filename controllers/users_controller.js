const user = require('../models/user');
module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: 'User Profile'
    })
}

//Render the log in page
module.exports.login = function(req,res){
    return res.render('log_in',{
        title: 'Codial || Log In'
    })
}

module.exports.create_session = function(req,res){
    user.findOne({
        email : req.body.email,
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

//Render the sign up page
module.exports.signup = function(req,res){
    
    return res.render('sign_up',{
        title:'Codial || Sign Up'
    })
}

//Post controller for sign up
module.exports.create = function(req,res){
    console.log(req.body);
    if(req.body.password == req.body.confirmpassword){
        user.create({
            email: req.body.email,
            password : req.body.password,
            username : req.body.username
        })
        return res.send("<h3>Successfully Signed Up!!!</h3>");
    }
    else
    return res.send("<h3>Your passwords do not match</h3>");
}