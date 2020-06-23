const User = require('../models/user');

//Render the profile page
module.exports.profile = async function (req, res) {
    try {
        let user = await User.findById(req.params.id);
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        });
    } catch (err) {
        console.log("Error:", err);
        return;
    }

}

module.exports.update = async function (req, res) {
    try {
        if (req.user.id == req.params.id) {
            await User.findByIdAndUpdate(req.params.id, { username: req.body.name, email: req.body.email });
            return res.redirect('back');
        } else {
            return res.status(401).send("UnAuthorized...Hmnnn...");
        }
    } catch (err) {
        console.log("Error:", err);
        return;
    }
}

//Render the log in page
module.exports.login = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('log_in', {
        title: 'Codial || Log In'
    })
}

//post controller for log in
module.exports.create_session = function (req, res) {
    req.flash('success','Logged In Successfully!');
    return res.redirect('/');
}

//Render the sign up page
module.exports.signup = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    return res.render('sign_up', {
        title: 'Codial || Sign Up'
    })
}

//Post controller for sign up
module.exports.create = async function (req, res) {
    try {
        if (req.body.password == req.body.confirmpassword) {
            let user = await User.findOne({ email: req.body.email });

            if (!user) {
                await User.create(req.body);
                return res.redirect('/users/log-in');
            }
            else {
                return res.redirect('back');
            }

        }
        else
            return res.redirect("back");
    } catch (err) {
        console.log("Error:", err);
        return;
    }
}

module.exports.destroySession = function (req, res) {
    req.logout();
    req.flash('success','You have logged out!');
    return res.redirect('/');

}