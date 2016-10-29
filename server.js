/**
 * Created by Administrator on 2016-10-29.
 */
var express=require("express");
var app=express();
var path=require("path");
var session=require("express-session");
var bodyParser=require("body-parser");
app.set('view engine','html');
app.set('views',path.resolve("view"));
app.engine('.html',require('ejs').__express);
app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:"kaixin"
}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(function (req, res, next) {
    if(req.path=="/login"){
        next();
    }else if(req.path=="/user"){
        if(req.session && req.session.username){
         next();
        }else{
            res.redirect("/login");
        }
    }else{
        res.redirect("/user");
    }
});
app.get("/login",function (req, res) {
    res.render("./login");
});

app.post("/login",function (req, res) {
   var user=req.body;
    if(user.username==user.password){
        req.session.username=user.username;
        req.session.password=user.password;
        res.redirect("/user");
    }
});
app.get("/user",function (req, res) {
    res.render("user",{session:req.session});
});
app.listen(4511);


