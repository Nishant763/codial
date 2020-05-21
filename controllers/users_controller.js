module.exports.users = function(req,res){
   return res.end('<h1>Users Page</h1>');
}

module.exports.login = function(req,res){
    return res.end('<h2>User logged in successfully</h2>');
}