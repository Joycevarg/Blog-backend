var mongoose=require("mongoose");
userSchema=new mongoose.Schema({
    name:String,
    email:String,
    Createddate:{type:Date,default:Date.now},
    password:String
});

mongoose.model("user",userSchema);