const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
    },
    //this defines the object id of the liked object
    likeable: {
        type:mongoose.Schema.ObjectId,
        refPath:'onModel',
        required:true,
    },
    //this field is used for defining the type of the liked object since this is a dyamic reference
    onModel:{
        type:mongoose.Schema.ObjectId,
        required:true,
        enum:['Post','Comment']
    }
},{
    timestamps:true
});

const Like = mongoose.model('Like',likeSchema);

module.exports = Like;