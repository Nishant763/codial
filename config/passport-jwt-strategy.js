const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'codeial'
};

passport.use(new JWTStrategy(opts,function(jwtPayload,done){
    
    User.findById(jwtPayload.id, function(err,user){
        if(err){console.log("Error:",err);return;}
//check from Auth Header Bearer function () is missing
        if(user){
            return done(null,user);
        }
        else{
            return done(null,false);
        }
    })
}))

module.exports = passport;
