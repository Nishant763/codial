const comments = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req,res){

    Post.findById(req.body.post,function(err,post){
        if(post){
            
            comments.create({
                content: req.body.content,
                user: req.user._id ,
                post: req.body.post
            },function(err,comment){
                if(err){console.log("Error:",err);return;}
                
                post.comments.push(comment);
                post.save();
                
                return res.redirect('back');
            })

        }
    })
    
}

module.exports.destroy = function(req,res){

    Post.findById(req.params.idpost,function(err,post){
        if(post){

            comments.deleteOne({
                _id:req.params.idcomment
            },function(err){
                if(err){console.log("Error:",err);return;}

               
                post.comments.splice(post.comments.findIndex(function(i){
                    console.log(i);
                    return i == req.params.idcomment;
                }),1);
                console.log(post.comments);
                post.save(); //don't forget this
                return res.redirect('back');
            })
            
            
        }
        else{
            return res.redirect('back');
        }
    })
    
    

}