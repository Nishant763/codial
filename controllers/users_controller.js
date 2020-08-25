const User = require('../models/user');
const resetPassModel = require('../models/reset_pass_token');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const pathExists = require('path-exists');
const resetPasswordMailer = require('../mailers/reset_password_mailer');
const e = require('express');
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
            let user = await User.findByIdAndUpdate(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){console.log("****Multer Error:",err);}
                
                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file && req.file.mimetype=="image/jpeg"){
                    //this is just saving the path of the uploaded file into the avatar field in the user
                    if(user.avatar){
                        if(fs.existsSync(path.join(__dirname,'..',user.avatar)))
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                        
                    }
                    console.log(req.file);

                    user.avatar = User.avatarPath + '/' + req.file.filename;
                    user.save();
                    req.flash('success','Updated Your Profile!!');
                    
                }
                else{
                    req.flash('error','File invalid...');
                }
                
                
                return res.redirect('back');

                

            });
            
        } else {
            req.flash('error','UnAuthorized...Hmnnn...');
            return res.status(401).send("UnAuthorized...Hmnnn...");
        }
    } catch (err) {
        req.flash('error',err);
        return res.redirect('back');
    }
}

//Render the log in page
module.exports.login = function (req, res) {
    if (req.isAuthenticated()) {
        req.flash('success','Already Logged In!!!');
        return res.redirect('/users/profile');//there? open chats
    }
    
    return res.render('log_in', {
        title: 'Codial || Log In'
    })
}

//render the reset password page
module.exports.resetPassword = function(req,res){
    return res.render('forget_pass');
}

//process the data from rest pass form and send an email to the user to reset pass
module.exports.resetPasswordPost = async function(req,res){
    // console.log(req.body);
    try{
        let user = await User.findOne({email:req.body.email});
        if(user){
            let reset_pass_token = await  resetPassModel.create({
                user: user,
                accesstoken: crypto.randomBytes(20).toString('hex')        
             });
             
            reset_pass_token = await reset_pass_token.populate('user'); 
            //send mail to the user containing the pass reset link ('/reset_pass/?accesstoken=____')
            resetPasswordMailer.newPass(reset_pass_token); 
            req.flash('success','Please Check your email!');
        
            return res.redirect('/users/log-in');
        }
        else{
            req.flash('error','User not found!!');
            return res.redirect('back');
        }
    }
    catch(err){
        console.log("Error in resetPassPost Method: ",err);
        return;
    }
    
}
//renders the form page to reset password

module.exports.resetpassFormGet = async function(req,res){
    try{
    let accesstoken = await resetPassModel.findOne({accesstoken:req.params.accesstoken});
    
    return res.render('reset_pass_form',{accesstoken:accesstoken});    
    }
    catch(err){
        console.log("Error in resetPassFormGet: ",err);
        return;
    }
}

//finally processing the form data and changing password of the user
module.exports.resetpassFormPost = async function(req,res){
    try{
        if(req.body.pass1 == req.body.pass2){
            let accesstoken = await (await resetPassModel.findOne({accesstoken:req.params.accesstoken})).execPopulate('user');
            accesstoken.isValid = false;
            
            
            await accesstoken.save();
            console.log(accesstoken);
            let user = await User.findOne({email:accesstoken.user.email});
            user.password = req.body.pass1;
            await user.save();

            req.flash('success','Congrats! Your password has been reset!!');
            return res.redirect('/users/log-in');
        }
        else{
            req.flash("error","Passwords not match!!");
            return res.redirect('back');
        }
    }
    catch(err){
        console.log("Error in resetpassFormPost : ",err);
        return;
    }
} 

//post controller for log in
module.exports.create_session = function (req, res) {
    // console.log(req);
    req.flash('success','Logged In Successfully!');
    //return res.redirect('/');  
    // console.log(res,req);
    return res.redirect('/');  // go chrome 
}

//Render the sign up page
module.exports.signup = function (req, res) {
    if (req.isAuthenticated()) {
        req.flash('success','Already Logged In!!!');
        return res.redirect('/users/profile');
    }
    // tgro chrome
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
                req.flash('success','Successfully signed up!!!');
                return res.redirect('/users/log-in');
            }
            else {
                req.flash('error','User already signed up!!!');
                return res.redirect('back');
            }

        }
        else{
            req.flash('error','Passwords do not match!!!');
            return res.redirect('back');
        }
    } catch (err) {
        req.flash('error',err);
        return res.redirect('back');
    }
}

module.exports.destroySession = function (req, res) {
    req.logout();
    req.flash('success','You have logged out!');
    return res.redirect('/');

}