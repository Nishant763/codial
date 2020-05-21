//Divided the project into routes,controllers,models,config so that it is easily scalable.

const express = require('express');
const app = express();
const port = 8000;

//use express router
app.use('/',require('./routes'));

//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err)
    {
        console.log(`Error in running the server : ${err}`); //String interpolation
    }
    console.log(`Server is running on port ${port}`);
})

