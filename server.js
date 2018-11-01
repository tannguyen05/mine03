var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var users = require('./models/user');


var url = 'mongodb://localhost/myDatabase';
mongoose.connect(url, { useNewUrlParser: true },function(err){
    if(err) throw err;
    console.log("Database connected");
})
mongoose.set('useFindAndModify', false);
var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;
app.listen(port, function(){console.log("Server is running on port " + port)});

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');
//Read
app.route("/")
.get(function(req, res){

    users.find({}, function(err, data){
        if (err) return res.status(500).send(err);
        res.render("home", {data: data});
    })
})
.post(function(req, res){
    users.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email
    })
    res.redirect('/');
})
//Update
app.route("/update/:id")
.get(function(req, res){
    users.findOne({_id: req.params.id}, function(err, user){
        if (err) return res.status(500).send(err);
        res.render("update", {user: user});
    })
})
.post(function(req, res){
    var item = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email
    }
    users.findOneAndUpdate({_id: req.params.id}, {$set: item},{new: true},  function(err, result){
        if (err) return res.status(500).send(err);
        res.redirect('/');
    })
})

app.post("/delete/:id", function(req, res){
    users.findOneAndDelete({_id: req.params.id}, function(err, result){
        if (err) throw err
        res.redirect('/');
        
    })
})
