import express from "express";
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import {urlModel} from './models/urlshort.js'

mongoose.connect("mongodb://localhost:27017/urlshortner")

const app=express();
const PORT=9000;
 
app.use(express.static('public'));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}))


app.get("/",(req,res)=>{
    let info=urlModel.find(function(err,result){
        res.render('home',{
            urlresult:result
        });
    })
   
    
})
app.post("/create",(req,res)=>{
   
   let shorturl=new urlModel({
longurl:req.body.longurl,
shorturl: generateurl()
   })
   shorturl.save(function(err,data){
       if(err) throw err
       res.redirect("/")
   })
})

app.get("/:urlid",function(req,res){
    urlModel.findOne({shorturl:req.params.urlid},function(err,data){
        if(err) throw err;
        urlModel.findByIdAndUpdate({_id:data.id},{$inc:{clickcount:1}},function(err,updateddata){
            if(err) throw err
            res.redirect(data.longurl);
        })
        
    })
})

app.get("/delete/:id",function(req,res){
    urlModel.findByIdAndDelete({_id:req.params.id},function(err,deleteddata){
        if(err) throw err;
        res.redirect("/");
    })
})

app.listen(PORT,(req,res)=>{
    console.log("App connected in",PORT);
});

function generateurl(){
    var rndresult="";
    var characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var characterlength=characters.length;

    for(var i=0;i<5;i++){
        rndresult +=characters.charAt(
            Math.floor(Math.random()*characterlength)
        )
    }
    return rndresult;}

