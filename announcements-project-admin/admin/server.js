const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const upload = require('express-fileupload');
const bodyParser = require('body-parser'); 
const port = 3000;
const app = express();

const dbUrl ='mongodb+srv://Khushi:Khushi@cluster0.3ypzd.mongodb.net/node-demo?retryWrites=true&w=majority';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload());
// app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb'}));
app.use(express.static('public'));
app.get('/', (req, res) => { 
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
  });
  app.post('/users', (req, res) => {
    MongoClient.connect(dbUrl, { useUnifiedTopology: true }, (err, client) => {
      if (err) return console.error(err);
      const db = client.db('node-demo');
      const collection = db.collection('users');
      collection
        .insertOne(req.body)
        .then(() => {
          res.redirect('/');
        })
        .catch(() => {
          res.redirect('/');
        });
    });
    // console.log(req.body);
  });

app.listen(port, () => { 
    console.log(`Server listening on port ${port}`); 
  });

  app.set('view engine', 'ejs');
  app.delete('/users', (req, res) => {
    MongoClient.connect(dbUrl, { useUnifiedTopology: true }, (err, client) => {
        if (err) return console.error(err);
        const db = client.db('node-demo');
        const collection = db.collection('users');
        collection
            .deleteOne(req.body)
            .then(() => {
                res.json(`Deleted user`);
            })
            .catch(() => {
                res.redirect('/');
            });
    });
});
app.put('/users', (req, res) => {
  MongoClient.connect(dbUrl, { useUnifiedTopology: true }, (err, client) => {
      if (err) return console.error(err);
      const db = client.db('node-demo');
     
      
     
  });
});