// -- EXPRESS --
var express = require('express');
var app = express();


// -- STATIC PATH
var path = require('path');
app.use(express.static(path.join(__dirname, './static')));


// -- SET the VIEW path
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');


// -- BODY-PARSER
var bodyParser = require('body-parser');
app.use(bodyParser.json());


// -- MONGOOSE --
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/messageboard_mongoose');


// -- SCHEMA as JS Objects for creating BLUEPRINT --
const CommentSchema = new mongoose.Schema({
 name: {type:String, required:[true, "Comment must have a name"]},
 comment: {type:String, required:[true, "Comment must have a comment"]},
},{timestamps:true})

const MessageSchema = new mongoose.Schema({
 name: {type:String, required:[true, "Message must have a name"]},
 message: {type:String, required:[true, "Message must have a comment"]},
 comments: [CommentSchema]
},{timestamps:true})






// -- ROUTES --

app.get('/', function(req, res) {
    res.render('index',{data:data});
})



app.post('/message', function(req,res){

  Message.create(req.body, function(err, data){
       if(err){
            // handle the error from creating a blog
            console.log("");
       }
       else {
            User.findOneAndUpdate({_id: req.params.id}, {$push: {message: data}}, function(err, data){
                 if(err){
                      // handle the error from trying to update the user
                      console.log("");
                 }
                 else {
                      // it worked! How shall we celebrate
                      console.log("");
                      res.redirect('/');
                 }
            })
        }
  })
})


// Setting our Server to Listen on Port: 8000
app.listen(8001, function() {
    console.log("listening on port 8001");
})
