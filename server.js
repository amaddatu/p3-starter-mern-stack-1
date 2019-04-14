const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    // Although this references the build folder... Use the public folder in client/public to publish images/css/any static file
  app.use(express.static("client/build"));
  // client/public is the actual folder to use for static files
}

// You really only need API routes and not any HTML routes if you are using REACTJS as the frontend
// ******************************API ROUTES INCLUDED HERE***************************** //

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});



app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
