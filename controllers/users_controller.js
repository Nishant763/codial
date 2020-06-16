const User = require('../models/user');

//Render the profile page
module.exports.profile = function (req, res) {
    User.findById(req.params.id, function(err,user){
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        });

    })
    
}

module.exports.update = function(req,res){
    console.log(req.body);
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id,{username: req.body.name,email: req.body.email},function(err,user){
            return res.redirect('back');
        })
    } else{
        return res.status(401).send("UnAuthorized...Hmnnn...");
    }
}

//Render the log in page
module.exports.login = function (req, res) {
    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }
    return res.render('log_in', {
        title: 'Codial || Log In'
    })
}

//post controller for log in
module.exports.create_session = function (req, res) {
    // To do later
    return res.redirect('/');
}

//Render the sign up page
module.exports.signup = function (req, res) {
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('sign_up', {
        title: 'Codial || Sign Up'
    })
}

//Post controller for sign up
module.exports.create = function (req, res) {
    console.log(req.body);
    if (req.body.password == req.body.confirmpassword) {
        User.findOne({ email: req.body.email }, function (err, doc) {
            if (err) { console.log('error in finding user in signing up'); return; }
            if (!doc) {
                User.create(req.body, function (err, user) {

                    if (err) { console.log('error in creating user while signing up'); return; }
                    return res.redirect('/users/log-in');
                })
            }
            else {
                return res.redirect('back');
            }

        })

    }
    else
        return res.redirect("back");
}

module.exports.destroySession = function (req,res) {
    req.logout();

    return res.redirect('/');

}