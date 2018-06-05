var mongoose=require("mongoose"),
schema=mongoose.Schema;

var articleSchema=schema({
    title:String,
    createdAt:{type:Date,default:Date.now},
    author:String
})

mongoose.model("article",articleSchema);