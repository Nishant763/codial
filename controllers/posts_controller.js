const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');
module.exports.create = async function (req,res) {
    try{
        if(req.isAuthenticated()){
            
           let post = await Post.create({
                content: req.body.content,
                user: req.user._id
            });
            if(req.xhr){
                req.flash('success','post created');
                return res.status(200).json({
                    data: {
                        post:post
                    },
                    message:"Post created!"
                })
            }
            
            return res.redirect('back');
        
        
        }
    }catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
}

module.exports.destroy = async function(req,res){
   try{ 
        let post = await Post.findById(req.params.id).populate('likes');
        if(post.user == req.user.id){
           
            //Change:: delete the associated likes on the post and all its comments' likes too
            await Like.deleteMany({likeable: post,onModel:'Post'});
            await Like.deleteMany({_id: {$in: post.comments}});
            post.remove();

            let comments =  await Comment.deleteMany({post:req.params.id});

            if(req.xhr){
                
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post deleted"
                })
            }
            
            return res.redirect('back');
        }
        else{
            req.flash('error','Not allowed to delete the posts');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }   
}