const comments = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');
const queue = require('../config/kue');
const commentsMailerWorker = require('../workers/comments_mailer_worker');
const Like = require('../models/like');
module.exports.create = async function (req, res) {

    

    try {
        let post = await Post.findById(req.body.post);
        if (post) {

            let comment = await comments.create({
                content: req.body.content,
                user: req.user._id,
                post: req.body.post
            });

            post.comments.push(comment);
            
            comment = await comment.populate('user','username email').execPopulate();
            console.log("inside create in posts_controller:",comment);
            comment.save();
            post.save();
            // commentsMailer.newComment(comment);
            let job = queue.create('emails',comment).save(function(err){
                if(err){console.log("Error in pushing jobs to the emails queue",err);return;}

                console.log("comments_mailer_job: ",job.id);                
            });
            req.flash('success','Comment created successfully!!!');
            return res.redirect('back');
        }
    } catch (err) {
        req.flash('error',err);
        return res.redirect('back');
    }
}




// module.exports.destroy = function(req,res){

//     Post.findById(req.params.idpost,function(err,post){
//         if(post){

//             comments.deleteOne({
//                 _id:req.params.idcomment
//             },function(err){
//                 if(err){console.log("Error:",err);return;}


//                 post.comments.splice(post.comments.findIndex(function(i){

//                     return i == req.params.idcomment;
//                 }),1);
//                 console.log(post.comments);
//                 post.save(); //don't forget this
//                 return res.redirect('back');
//             })


//         }
//         else{
//             return res.redirect('back');
//         }
//     })



// }

//Another way of writing destroy function(Verifying whether the comment exists or not and deleting the comment)
module.exports.destroy = async function (req, res) {
    try {
        let comment = await comments.findById(req.params.idcomment).populate('likes');
        
        if (comment.user == req.user.id) {

            let postId = comment.post;
            for(like of comment.likes){
                let likeR = await Like.findById(like._id);
                likeR.remove();
            }
            comment.remove();

            let post = await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.idcomment } });
            post.save();
            req.flash('success','Comment deleted successfully!!!');
            return res.redirect('back');
        }
        else {
            req.flash('error','Not allowed to delete this comment!!!');
            return res.redirect('back');
        }
    } catch (err) {
        req.flash('error',err);
        return res.redirect('back');
    }
}