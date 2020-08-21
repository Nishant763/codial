const passport = require('passport');

const  GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const crypto = require('crypto');

const User = require('../models/user');

//tell passport to add a new strategy for google login
passport.use(new GoogleStrategy({
        clientID:"878334570798-0l3tjm721v88ftjal4dsdlui052dds10.apps.googleusercontent.com",
        clientSecret:"UniWgyjDNFX3MzbE1yA8Cxy_",
        callbackURL: "http://localhost:8000/users/auth/google/callback"
    },
    function(accessToken,refreshToken,profile,done){
        //find a user
        User.findOne({email: profile.emails[0].value}).exec(function(err,user){
            if(err){console.log("error in google-strategy-passport:",err);return;}

            console.log(profile);

            if(user){
                // if found , set this user as req.user
                return done(null,user);
            }
            else{
                // if not found, create the user and set it as req.user
                User.create({
                    username: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err,user){
                    if(err){console.log("Error in creating user google-strategy-passport",err); return;}

                    return done(null,user);
                })
            }
        })
    }

))

module.exports = passport;