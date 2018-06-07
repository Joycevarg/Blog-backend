var mongoose=require("mongoose"),
schema=mongoose.Schema,
user=mongoose.model("user");

var articleSchema=schema({
    title:String,
    content:String,
    createdAt:{type:Date,default:Date.now},
    author:{type:schema.Types.ObjectId,ref:"user"}
})

mongoose.model("article",articleSchema);