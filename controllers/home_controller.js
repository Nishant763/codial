const post = require('../models/post');
const user = require('../models/user');

module.exports.home = function(req, res){
    
       

        post.find({}).populate('user').exec(function(err,posts){
            if(err){console.log("Error"); return;}
            
            return res.render('home',{
                Posts: posts,
                title: "Home"
            })
        
        })
} 

// module.exports.actionName = function(req, res){}