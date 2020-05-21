module.exports.users = function(req,res){
   return res.send('<h1>Users Page</h1>');
}

module.exports.login = function(req,res){
    return res.render('login',{
        title:"Your Name",
    })
}