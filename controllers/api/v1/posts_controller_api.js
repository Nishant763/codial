const Post = require("../../../models/post");
const Comment = require("../../../models/comment");
module.exports.index = async function(req,res){
    
    let posts = await Post.find({})
            .sort('-createdAt')
                .populate('user','-password')
                .populate({
                    path:'comments',
                    populate:{
                        path:'user'
                    }
                });
            
    
    return res.json(200,{
        posts: posts,
        message:  "list of posts",
    });
}

module.exports.destroy = async function(req,res){
    try{ 
         let post = await Post.findById(req.params.id);
         //if(post.user == req.user.id){
             post.remove();
 
             let comments =  await Comment.deleteMany({post:req.params.id});
 
           
             
             return res.json(200,{
                 message:"Posts and associated comments are deleted..",
             });
        //  }
        //  else{
        //      req.flash('error','Not allowed to delete the posts');
        //      return res.redirect('back');
        //  }
     }catch(err){
        //  req.flash('error',err);
         console.log("*****",err);
         return res.json(500,{
             message:"Internal Server Error",
         });
     }   
 }