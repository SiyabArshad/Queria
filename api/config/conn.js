const mongoose=require('mongoose')
const connection=()=>{
    mongoose.connect("mongodb://localhost:27017/queria",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then(()=>console.log('db connected')).catch(err=>console.log(err));
}
module.exports=connection