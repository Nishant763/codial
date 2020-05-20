//Divided the project into routes,controllers,models,config so that it is easily scalable.

const express = require('express');
const app = express();
const port = 8000;

app.use('/',require('./routes/index'));

app.listen(port,function(err){
    if(err)
    {
        console.log(`Error in running the server : ${err}`); //String interpolation
    }
    console.log(`Server is running on port ${port}`);
})