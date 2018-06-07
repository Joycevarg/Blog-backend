var mongoose=require("mongoose"),
article=mongoose.model("article");


module.exports={

    newArticleForm:function(req,res){
        res.sendFile(_rootdir+"/static/newarticle.html");
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
            res.send("article created");
                  })
    
            },
    listArticles:function(req,res){
        article.find({}).populate('author').exec(function(err,articles){
           // console.log(articles);
            res.render('home',{articles:articles});
        })},
    readArticle:function(req,res){
        article.findById(req.params.articleId).populate("author").exec(function(err,readArticle){
            console.log(readArticle);
           res.render('article',{readArticle:readArticle});

        });
    
    }
};
