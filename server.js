const express = require("express");
const fs = require("fs");
const path = require("path");

//Express server setup
const app = express();
let PORT = process.env.PORT || 3000;
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Routes
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
  });
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  });

//Start server
app.listen(PORT, function() {
    console.log("Listening on port "+ PORT);
})