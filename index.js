//Divided the project into routes,controllers,models,config so that it is easily scalable.
//Done: store the session-cookie using MongoStore,log-in page shouldn't be accessible after loging in
//To Do: 1. make the website more beautiful  3.add file field to every post and submit it via ajax 
const express = require('express');
// const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const db = require('./config/mongoose');
//used for session cookie
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMiddleware = require('./config/middleware');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}))

app.use(express.urlencoded());

app.use(cookieParser());

//make the uploads path available to browser
app.use('/uploads',express.static(__dirname+'/uploads'));

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
app.use(flash());
app.use(customMiddleware.setFlash);
//use express router
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err)
    {
        console.log(`Error in running the server : ${err}`); //String interpolation
    }
    console.log(`Server is running on port ${port}`);
})

