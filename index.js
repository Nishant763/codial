//Divided the project into routes,controllers,models,config so that it is easily scalable.

const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

app.use(express.static('./assets'));
app.use(expressLayouts);



//use express router
app.use('/',require('./routes'));

//extract styles and scripts from sub pages into layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

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

