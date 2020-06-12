const post = require('../models/post');


module.exports.addpost = function (req,res) {
    if(req.isAuthenticated()){
        console.log(req.body.content);
        post.create({
            content: req.body.content,
            user: req.user
        },function(err,postDoc){
            if(err){ 
                console.log("Error in creating the document");
                return;
            }
            console.log(postDoc);
            return res.redirect('back');
        })
        
        
    }

    
}