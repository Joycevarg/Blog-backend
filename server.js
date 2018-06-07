var express=require("express"),
logger=require("morgan"),
static=require("static"),
mongoose=require("mongoose"),
session = require("express-session"),
cookieParser = require('cookie-parser'),
app=express();

require("./models/usermodel");
require("./models/articlemodel");


global._rootdir=__dirname;
var dburl="mongodb://localhost/blog";
app.use(cookieParser());
app.use(session({resave: true, saveUninitialized: true, secret: 'SOMERANDOMSECRETHERE', cookie: { maxAge: 60000 }}));
app.use(express.urlencoded({extended:true}));
app.use(logger());
app.use(express.static(__dirname+'/static'));
app.set('view engine','ejs');
var articleController=require('./controllers/articleController');
var userController=require('./controllers/userController');

mongoose.connect(dburl);
console.log("connected");
var notImplemented=function(req,res)
{
    res.send(404);
}

app.get('/',articleController.listArticles);
app.get('/newArticle',articleController.newArticleForm);
app.post('/newArticle',articleController.submitArticle);
app.get('/articles/:articleId',articleController.readArticle)


app.get('/newUser',userController.newUserForm);
app.get('/login',userController.loginForm);
app.post('/login',userController.login);
app.post('/logout',userController.logout)
app.post('/newUser',userController.createUser);
app.get('/user/:userId',userController.seeUser);

console.log("listening on port 8080");
app.listen(8080);


