const express= require('express')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const Post = require("./schemas/schema");

const app=express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

mongoose.connect(
    "mongodb+srv://Surya_10:Surya2000@cluster0.mkvz5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", 

    ()=>{
      console.log("connected");
    }
  );
  var db = mongoose.connection;
  app.get("/", (req, res) => {
    Post.find({}, (err, doc) => {
      if (err) {
        res.status(500).send({ error: "unable to fetch" });
      }
      res.status(200).send(doc);
    });
  });
app.post("/insert", async (req, res) => {
    let name = req.body.name;
    let gender = req.body.gender;
    var post = new Post();
    post.name = name;
    post.gender = gender;
    
    post.save(function (error, savedPost) {
        if (error) {
          res.status(500).send({ error: "Unable to save Post " });
        } else {
          res.status(200).send(savedPost);
        }
      });
  });
  app.post("/delete", async (req, res) => {
    let name = req.body.name;
    Post.deleteOne({ name: name })
      .then(() => {
        res.status(200).send("Deleted");
      })
      .catch((err) => {
        res.status(500).send({ error: "Unable to Delete post" });
      });
  });
app.post("/find", async (req, res) => {
    var query = req.body.name;
    Post.find({ name: query }, (err, doc) => {
      if (err) {
        res.status(500).send("Unable to fetch post");
      }
      res.send(doc);
    });
  });

  app.post("/update", async (req, res) => {
    var name = await req.body.name;
    var gender = await req.body.gender;
    Post.findOneAndUpdate(
      { name: name },
      { gender: gender },
      { new: true },
      (err, doc) => {
        if (err) {
          res.status(500).send("Unable to update");
        } else {
          res.status(200).send(doc);
        }
      }
    );
  });
app.listen(3000,function(){
    console.log("started");
})
