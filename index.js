const express=require("express");
const app=express();
const path=require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override')


let port=3000;
app.listen(port,()=>{
    console.log(`app is listenin at port ${port}`)
})

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride('_method'))

let posts=[
    {
        id:uuidv4(),
    username:"Shriya Gurjar",
    content:"Future Millionaire",
    },
{
    id:uuidv4(),
    username:"Abhinanadan Gurjar",
    content:"Need a job",
    },
{
    id:uuidv4(),
    username:"Manisha Gurjar",
    content:"What a wonderfull day",
    },

];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs")
})
app.post("/posts",(req,res)=>{
  const{ username,content}= req.body;
  let id=uuidv4();
  posts.push({id,username,content});
  res.redirect("/posts");
})
app.get("/posts/:id",(req,res)=>{
   
   let id = req.params.id;
  let post = posts.find((p) => p.id === id);

    console.log(id);
   
    res.render("show.ejs",{post});

});
app.patch("/posts/:id",(req,res)=>{
    let id = req.params.id;
    let newContent=req.body.content;
  let post = posts.find((p) => p.id === id);
  post.content=newContent;
  res.redirect("/posts");

})
app.get("/posts/:id/edit",(req,res)=>{
     let id = req.params.id;
  let post = posts.find((p) => p.id === id);
res.render("edit.ejs",{post});
})
app.delete("/posts/:id",(req,res)=>{
      let id = req.params.id;
     posts = posts.filter((p) => p.id !== id);
     res.redirect("/posts");
     
})