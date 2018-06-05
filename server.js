var express=require("express"),
logger=require("morgan"),
static=require("static"),
mongoose=require("mongoose"),
app=express();
require("./models/articlemodel");

global._rootdir=__dirname;
var dburl="mongodb://localhost/blog";

app.use(express.urlencoded({extended:true}));
app.use(logger());
app.use(express.static(__dirname+'/static'));
app.set('view engine','ejs');
var articleController=require('./controllers/articleController');
mongoose.connect(dburl,function(err,db){
if(err)
    {console.log(err);
    throw(err);}
console.log("connected");
var notImplemented=function(req,res)
{
    res.sendStatus(404);
}

app.get('/',notImplemented);
app.get('/newArticle',articleController.newForm);
app.post('/newArticle',notImplemented);
app.get('/:articleId',notImplemented)


app.get('/newUser',notImplemented);
app.post('/newUser',notImplemented);
app.get('/user:userid',notImplemented);

console.log("listening on port 8080");
app.listen(8080);
});


