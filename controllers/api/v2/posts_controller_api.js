module.exports.index = function(req,res){
    return res.json(200,{
        message:"API@2 rendered",
        posts:[]
    });
}