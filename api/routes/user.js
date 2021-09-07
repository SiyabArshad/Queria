const router = require("express").Router();
const User =require('../models/user')
const CryptoJS = require("crypto-js");
const verify = require("../middlewares/verify");
//UPDATE
router.put("/updateuser/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id) {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.secretkey
      ).toString();
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can update only your account!");
  }
});

//DELETE
router.delete("/deleteuser/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can delete only your account!");
  }
});
router.get("/user/:id",verify ,async (req, res) => {
  if(req.user.id)
  { 
  try {
      const user = await User.findById(req.params.id);
      const { password, ...info } = user._doc;
      res.status(200).json(info);
    } catch (err) {
      res.status(500).json(err);
    }}
    else
    {
      res.status(404).json("you are not allowed")
    }
  });
  router.get("/users", verify, async (req, res) => {
    if (req.user.id) {
      try {
        const users = await User.find()   
        res.status(200).json(users);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You are not allowed to see all users!");
    }
  });
  router.get("/totalusers",verify,async(req,res)=>{
      if(req.user.id)
      {
        try {
            const totalusers = await User.count()   
            res.status(200).json(totalusers);
          } catch (err) {
            res.status(500).json(err);
          }       
      }
      else
      {
        res.status(403).json("You are not allowed to see total users!");
      }
  })
module.exports=router