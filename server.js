require("dotenv").config();
require("dotenv").config({ path: '.env.local' });
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const passport = require("passport");
const passportGoogleAuth = require('passport-google-oauth20');
const GoogleStrategy = require('passport-google-oauth20').Strategy;


// console.log(process.env.GOOGLE_CALLBACK);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(require('cookie-parser')());
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    // Although this references the build folder... Use the public folder in client/public to publish images/css/any static file
  app.use(express.static("client/build"));
  // client/public is the actual folder to use for static files
}
let userTemporary = null;
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK
}, 
function(accessToken, refreshToken, data, cb) {
  console.log(data);
  var email = data.emails[0].value;
  var google_id = data.id;

  userTemporary = {
    id: 1,
    email: email,
    google_id: google_id
  };
  return cb(null, userTemporary);
  // //try to find user
  // db.User.findOne({
  //   google_id: google_id
  // })
  // .then(function(user){
  //   if(!user){
  //     // SAVE USER DATA HERE
  //     db.User.create({
  //       email: email,
  //       google_id: google_id
  //     })
  //     .then(function(user){
  //       //more magic after creating the user
  //       return cb(null, user);
  //     });
  //   }
  //   else{
  //     //more magic after finding the user
  //     return cb(null, user);
  //   }
  // })
  // .catch( err => {
  //   console.log(err);
  //   return cb(err, null);
  // });
}));

// when we save a user to a session
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// when we retrieve the data from a user session
passport.deserializeUser(function(id, done) {
  if(id === userTemporary.id){
    done(null, userTemporary);
  }
  else{
    done(new Error('You goofed'), false);
  }
  // db.User.findOne({ where: {id: id }})
  // .then(function (user) {
  //     done(null, user);
  // })
  // .catch(error => {
  //     console.log(error);
  //     done(error, false);
  // })
  // ;
});

// You really only need API routes and not any HTML routes if you are using REACTJS as the frontend
// ******************************API ROUTES INCLUDED HERE***************************** //
require('./routes/api-routes')(app, passport);

// Send every request to the React app
// Define any API routes before this runs
// will be broken in development...
app.get("*", function(req, res) {
  if (process.env.NODE_ENV === "production") {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  }
  else{
      // reminder
      res.json({"message": "Go to http://localhost:3000"});
  }
});



app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
