var mongoose=require("mongoose"),
user=mongoose.model("user");

module.exports={

    createUser:[    
        function(req,res,next){
            user.findOne({email:req.body.email},function(err,userdata){
                if(err)
                     {   console.log(err);
                         next(err);
                     }
                if(userdata)
                {
                    res.send("User already exists");
                }
                else
                next();})
        },
        function(req,res,next){
        var newUser=new user({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        });
        newUser.save(function(err){
            if(err) throw(err);
            console.log("New User Created:"+req.body.name);
            res.send("User created");
        })
    }],
    newUserForm:function(req,res){
        res.sendFile(_rootdir+"/static/newuser.html");
    },
    loginForm:function(req,res){
        res.sendFile(_rootdir+"/static/login.html");
    },
   login:[
       function(req,res,next){
           user.findOne({email:req.body.email},function(err,userdata){
           if(err)
                {   console.log(err);
                    next(err);}
            req.reqdata=userdata;
            next();})},
       function(req,res,next)
       {
            if(!req.reqdata){
            res.send("User not found");
            next(err);}
            else{
            next();}
       },
       function(req,res,next)
       {    
            if(req.reqdata.password==req.body.password)
            {req.session.userId=req.reqdata.id;
             res.redirect("/");
            }
            else
            res.send("Password Wrong")
       }],
    logout:function(req,res,next){
        if(req.session&&req.session.userId){console.log(req.session.userId);
            req.session.destroy(function(err){
                if(err) return next(err);
                else{
                    res.redirect("/");
                }
            })
        }
        else{
            res.send("Already logged out");
        }
    },
    seeUser:function(req,res){
        user.findById(req.params.userId,function(err,thisuser){
            console.log(thisuser);
           res.render('user',{thisuser:thisuser,loggedIn:req.session.userId});

        });
    
    }

       
   
};