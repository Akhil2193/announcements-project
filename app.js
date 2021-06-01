const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app=express();

app.use(bodyParser.urlencoded({extended:  true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

const dbUrl ='mongodb+srv://Khushi:Khushi@cluster0.3ypzd.mongodb.net/node-demo?retryWrites=true&w=majority';

mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true});

app.get('/', function(req,res){
    res.set('Cache-Control','public, max-age =300, s-maxage = 600');
    MongoClient.connect(dbUrl, { useUnifiedTopology: true }, (err, client) => {
        if (err) return console.error(err);
        const db = client.db('node-demo');
        const collection = db.collection('users');
        collection
          .find()
          .toArray()
          .then((results) => {
            res.render('index.ejs', { users: results });
          })
          .catch((error) => {
            res.redirect('/');
          });
      });

})
app.post('/description',function(req,res){
    console.log(req.body);
    const eventID = req.body.eventAnnouncerID;
    var o_id = new ObjectId(eventID);
    function find (name, query, cb) {
        mongoose.connection.db.collection(name, function (err, collection) {
           collection.find(query).toArray(cb);
       });
    }
    find('users',{"_id": o_id},function(err,docs){
        var description = docs[0].fname;
        if (err) {
            res.send(err);
        }
        else{
            res.render('description',{eventDescription: description});
        }
    })
})
app.listen(5000,function(){
    console.log('Server is running at port 5000...');
})