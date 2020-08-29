const mongoose = require('mongoose');

const friendshipSchema = new mongoose.Schema({
    //the user who send this request
    from_user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    //the user who accepted this request, naming is for our understanding
    to_user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{
    timestamps:true
});

const Friendship = mongoose.model('Friendship',friendshipSchema);
module.exports = Friendship;