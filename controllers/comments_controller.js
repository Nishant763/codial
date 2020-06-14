const comments = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req,res){
console.log(req.body.post);
    Post.findById(req.body.post,function(err,post){
        if(post){
            //i think i understood the bug, it is finding all the posts,yaa that is the problem
            comments.create({
                content: req.body.content,
                user: req.user._id ,
                post: req.body.post
            },function(err,comment){
                if(err){console.log("Error:",err);return;}
                console.log(post);
                post.comments.push(comment);
                post.save();
                
                return res.redirect('back');
            })

        }
    })
    
    
}