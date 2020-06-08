const user = require('../models/user');

//Render the profile page
module.exports.profile = function (req, res) {
    return res.render('user_profile', {
        title: 'User Profile'
    })
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
        user.findOne({ email: req.body.email }, function (err, doc) {
            if (err) { console.log('error in finding user in signing up'); return; }
            if (!doc) {
                user.create(req.body, function (err, user) {

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