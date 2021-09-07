const router = require("express").Router();
const Post=require("../models/post")
const verify = require("../middlewares/verify");
const upload=require("../middlewares/Upload")
//CREATE
router.post("/addpost",upload,verify,async(req,res)=>{
   if(req.user.id)
   {
    try {
        const newpost = new Post({
        title: req.body.title,
        desc: req.body.desc,
        img:req.file.filename
    });
    const posts = await newpost.save();
    res.status(201).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }}
  else
  {
      res.status(404).json("your not alllowed")
  }
})
//UPDATE
router.put("/updatepost/:id",upload, verify, async (req, res) => {
    if (req.user.id) {
      try {
        const updatedpost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set:  req.body
          },
          { new: true }
        );
        res.status(200).json(updatedpost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You are not allowed!");
    }
  });
  //Delete
  router.delete("/deletepost/:id", verify, async (req, res) => {
    if (req.user.id) {
      try {
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json("post has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You cannot delete post!");
    }
  });
 //get 
 router.get("/post/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  router.get("/posts",  async (req, res) => {
      try {
        const posts = await Post.find()   
        res.status(200).json(posts);
      } catch (err) {
        res.status(500).json(err);
      }
    
  });

  router.get("/totalposts",verify,async(req,res)=>{
    if(req.user.id)
    {
      try {
          const totalposts = await Post.count()   
          res.status(200).json(totalposts);
        } catch (err) {
          res.status(500).json(err);
        }       
    }
    else
    {
      res.status(403).json("You are not allowed to see total posts!");
    }
});
//search
router.get('/search',async(req,res)=>{
const searchfeild=req.query.title
try{
const data=await Post.findOne({title:searchfeild})
res.status(200).json(data)
}
catch(err)
{
  res.status(500).json(err)
}
})
module.exports=router