//Divided the project into routes,controllers,models,config so that it is easily scalable.
//Done: store the session-cookie using MongoStore,log-in page shouldn't be accessible after loging in
const express = require('express');
// const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
//used for session cookie
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);





//extract styles and scripts from sub pages into layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

// mongo store is used to store the session cookie in the db
app.use( session({
    name:'codial',
    //TODO change the secret before deployment in production mode
    secret:'blahblahblah',
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({
                            mongooseConnection: db,
                            autoRemove: 'disabled'
                          },
                          function(err){
                              console.log(err || "connect-mongodb setup ok");
                          }
    ),
    cookie: {
        maxAge: (1000 * 60 * 1000000)
    }
    
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//use express router
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err)
    {
        console.log(`Error in running the server : ${err}`); //String interpolation
    }
    console.log(`Server is running on port ${port}`);
})

