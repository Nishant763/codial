const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function (req,res) {
    try{
        if(req.isAuthenticated()){
            
            await Post.create({
                content: req.body.content,
                user: req.user._id
            });
            req.flash('success','Post created successfully!!!');
            return res.redirect('back');
        
        
        }
    }catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
}

module.exports.destroy = async function(req,res){
   try{ 
        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id){
            post.remove();

            let comments =  await Comment.deleteMany({post:req.params.id});
            req.flash('success','Post and associated comments destroyed successfully!!!');
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