var express = require("express");
var path = require("path");
var mongoose = require("mongoose");
var app = express();
var port = 3000;
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded());
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
mongoose.connect(
    "mongodb://localhost:27017/feedback",
    { useUnifiedTopology: true }
);
  
// Create schema
const feedSchecma = mongoose.Schema({
    name: String,
    email: String,
    feed: String
});
  
// Making a modal on our already
// defined schema
const feedModal = mongoose
    .model('feeds', feedSchecma);
  
// Handling get request
app.get('/', function (req, res) {
    // Rendering your form
    res.render('feedback_form');
});
  
// Handling data after submission of form
app.post("/feedback_form", function (req, res) {
    const feedData = new feedModal({
        name: req.body.name,
        email: req.body.email,
        feed: req.body.feedback
    });
    feedData.save()
        .then(data => {
            res.render('feedback_form',
{ msg: "Your feedback successfully saved." });
        })
        .catch(err => {
            res.render('feedback_form', 
                { msg: "Check Details." });
        });
})
  
// Server setup
app.listen(port, () => {
    console.log("server is running");
});
app.use("/", (req, res) => {
res.render(__dirname + "/public/service.pug");
});
/*app.use("/signup", (req, res) => {
  res.render(__dirname + "/public/service.pug");
});*/
 
app.listen(port, () => {
  console.log("Server listening on port " + port);
});