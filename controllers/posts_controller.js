const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function (req,res) {
    if(req.isAuthenticated()){
        console.log(req.body.content);
        Post.create({
            content: req.body.content,
            user: req.user._id
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

module.exports.destroy = function(req,res){
    Post.findById(req.params.id,function(err,post){
        if(post.user == req.user.id){
            post.remove();

            Comment.deleteMany({post:req.params.id},function(err) {
                return res.redirect('back');
            })
        }
        else{
            return res.redirect('back');
        }
    })
}