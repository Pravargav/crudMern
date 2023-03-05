const mongoose=require("mongoose");
const foodSchema=new mongoose.Schema({fName :{type:String,required:true},days :{type :Number,required:true}});
const food=mongoose.model("fruits",foodSchema);
module.exports=food;