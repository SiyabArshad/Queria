const mongoose =require("mongoose")
const postschema=new mongoose.Schema ({
 title:{type:String,required:true} ,
 desc:{type:String,required:true} ,
 img:{type:String,default:""} 
},
{ timestamps: true }
)
module.exports=mongoose.model("posts",postschema)