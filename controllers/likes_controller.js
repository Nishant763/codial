const Like = require('../models/like');
const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.toggleLike = async function(req,res){
    try {

        // likes/toggle/?id=abcdef&type=Post
        let likeable;
        let deleted = false;

        if(req.query.type == 'Post'){
            likeable = await Post.findById(req.query.id).populate('likes');

        }
        else{
            likeable = await Comment.findById(req.query.id).populate('likes');
        }

        //check if a like already exists
        let existingLike = await Like.findOne({
            likeable:req.query.id,
            onModel:req.query.type,
            user: req.user._id
        })
        
        //if a like already exists,delete it
        if(existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();

            existingLike.remove();
            deleted = true;
        }else{
            //make a new like
            let newLike = await Like.create({
                user: req.user._id,
                onModel:req.query.type,
                likeable:req.query.id
            })
            newLike.save();
            //push it into the array
            likeable.likes.push(newLike._id);
            likeable.save();
        }
        return res.json(200,{
            message:'Request successfull!',
            data:{
                deleted:deleted
            }
        })


    } catch (error) {
        console.log(error);
        return res.json(500, {
            message: 'Internal Server Error'
        })
    }
}