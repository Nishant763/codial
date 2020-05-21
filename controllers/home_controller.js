module.exports.home = function(req,res){
    return res.render('home',{
        title:"Home Page",
    });
}

module.exports.aboutUs = function(req,res){
    return res.send('<h2>About Us Page</h2>');
}