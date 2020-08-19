const User = require('../../../models/user');

const jwt = require('jsonwebtoken');

//post controller for log in
module.exports.create_session = async function (req, res) {
    try{
        let user = await User.findOne({email:req.body.email});
        console.log(user);
        if(!user || user.password != req.body.password){
            return res.json(422,{
                message:"Invalid Username or password",

            });
        }

        return res.json(200,{
            message: 'Sign in successful, here is your token, please keep it safe!',
            data :{
                token: jwt.sign(user.toJSON(),'codial',{  expiresIn: '10000'})
            }
        })




    }
    catch(err){
        console.log("Error:",err);
        return res.json(500, {
            message: 'Internal Server Error'
        });
    }
}