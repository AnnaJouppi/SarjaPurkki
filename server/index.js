//this is the "server file"
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const ejs = require("ejs");
const fs = require("fs");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening to port: ${PORT}`));

// this is needed for html form to submit data to JSON
app.use(bodyParser.urlencoded({ extended: true }));

// convert json string to json object (from request)
app.use(express.json());

// cors - allow connection from different domains and ports
app.use(cors());

app.set("view engine", "ejs");
app.set("views", "../client/views");

const reviewFilePath = "../data/reviews.json";

// Use json to save and post the review data

// Read reviews from JSON file and parse them

function readReviews() {
  const jsonData = fs.readFileSync(reviewFilePath);
  return JSON.parse(jsonData);
}

// Write reviews to JSON file
function writeReviews(data) {
  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFileSync(reviewFilePath, jsonData);
}

// Routes

// get route for all reviews
app.get("/sarjapurkki", (request, response) => {
  const reviews = readReviews();
  response.json(reviews);
});

// get route for ejs
app.get("/reviews.html", (req, res) => {
  const reviews = readReviews();
  res.render("reviews.ejs", { purkkiList: reviews });
});

// post route to add new review
app.post("/sarjapurkki", (request, response) => {
  const newReview = {
    showname: request.body.showname,
    yourname: request.body.yourname,
    score: request.body.score,
    reviewtext: request.body.reviewtext,
  };
  const reviews = readReviews();
  reviews.push(newReview);
  writeReviews(reviews);
  response.sendFile(__dirname + "/form-ty.html"); // sent after submitting review form
});

app.use(express.static("../client"));
app.use(express.static("../client/css"));
app.use(express.static("../client/js"));
app.use(express.static("../client/img"));
app.use(express.static("../client/views"));
