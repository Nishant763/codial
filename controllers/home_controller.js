const Post = require('../models/post');
const User = require('../models/user');
const Friendship = require('../models/friendship');

module.exports.home = async function(req, res){
    
       
       try{
            
            let posts = await Post.find({})
            .sort('-createdAt')
                .populate('user')
                .populate({
                    path:'comments',
                    populate:{
                        path:'user'
                    },
                    populate:{
                        path:'likes'
                    }
                }).populate('likes');
                
                let users = await User.find({});
                let auth_user,friendshipIdArr,friends;
                if(req.user){
                    auth_user = await User.findById(req.user._id).populate('friendships');
                     friendshipIdArr = auth_user.friendships;
                     friends = [];
                    for(let Id of friendshipIdArr){
                        let friendshipobj = await Friendship.findById(Id);
                        let friend = await User.findById(friendshipobj.to_user);
                        friends.push(friend);
                    }
                
                }
                
                return res.render('home',{
                    Posts: posts,
                    title: "Home",
                    all_users: users,
                    friends:friends
                })
        }catch(err){
            console.log("Error:",err);
            return;
        }        

            
} 

// module.exports.actionName = function(req, res){}