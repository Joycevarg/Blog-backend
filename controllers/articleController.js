var mongoose=require("mongoose"),
article=mongoose.model("article");


module.exports={

    newArticleForm:function(req,res){if(req.session.userId)
        res.sendFile(_rootdir+"/static/newarticle.html");
        else
        res.send('You need to be logged in to post');
        },

    submitArticle:function(req,res){
            var newarticle=new article({
                title:req.body.title,
                content:req.body.content,
                author:req.session.userId
             });
            newarticle.save(function(err){
            if(err) throw(err);
            console.log("New article created:"+req.body.title);
            res.redirect("/");
                  })
    
            },
    listArticles:function(req,res){
        article.find({}).populate('author').exec(function(err,articles){
           // console.log(articles);
            res.render('home',{articles:articles,loggedIn:req.session.userId});
        })},
    readArticle:function(req,res){
        article.findById(req.params.articleId).populate("author").exec(function(err,readArticle){
      //      console.log(req.session.loggedIn);
           res.render('article',{readArticle:readArticle,loggedIn:req.session.userId});

        });
    
    }
};
