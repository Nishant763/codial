module.exports.index = function(req,res){
    return res.json(200,{
        posts: [],
        message:  "list of posts",
    });
}