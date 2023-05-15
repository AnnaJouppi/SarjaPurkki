//this is the "server file"

const express = require('express') 
const cors = require('cors')
// const dotenv = require('dotenv')
const app = express();
const ejs = require('ejs');
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => 
    console.log(`Listening to port: ${PORT}`));



// this is needed for html form to submit data to MondoDB
app.use(bodyParser.urlencoded({extended: true}));

// convert json string to json object (from request)
app.use(express.json())


// cors - allow connection from different domains and ports
app.use(cors());

app.set('view engine', 'ejs');
app.set('views','../client/views');


// mongo here...
const mongoose = require('mongoose')
const CONNECTION_URL = 'mongodb+srv://dbUser:Nallukka1983@cluster0.ocuog.mongodb.net/sarjapurkki?retryWrites=true&w=majority'
mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log("Database connected")
})

// scheema
// objects going to the database
const purkkiSchema = new mongoose.Schema({
    showname: { type: String, required: false },
    yourname: { type: String, required: false }, 
    score:    { type: Number, required: false }, 
    reviewtext: { type: String, required: false } 
  })
  
  // model, all 3 have to be written or it won't work. Last one is the collection!
  const Purkki = mongoose.model('Purkki', purkkiSchema, 'purkki')
  

// Routes Leffapurkki API

// get
app.get('/sarjapurkki', async (request, response) => {
  const reviews = await Purkki.find({})
    response.json(reviews)
    //console.log(response.body)
})

// get route for ejs 
app.get('/reviews.html', (req, res) => {
  Purkki.find({}, function(err, shows) {
      res.render('reviews.ejs', {
          purkkiList: shows
          
      })
  })
})

// post
app.post('/sarjapurkki', async (request, response) => {
    console.log(request.body);
    const newPurkki = new Purkki({
      showname: request.body.showname,
      yourname: request.body.yourname,
      score: request.body.score,
      reviewtext: request.body.reviewtext

    })
    const savedPurkki = await newPurkki.save()
      response.sendFile(__dirname + "/form-ty.html"); // sent after submitting review form
  })

app.use(express.static('../client'));
app.use(express.static('../client/css'));
app.use(express.static('../client/js'));
app.use(express.static('../client/img'));
app.use(express.static('../client/views'));
