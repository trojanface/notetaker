const express = require("express");
const fs = require("fs");
const path = require("path");

//Express server setup
const app = express();
let PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Will need a static file host command thing to make the public folder accessible

//Routes
////GET
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});
app.get("/api/notes", function (req, res) {
  fs.readFile(path.join(__dirname, "/db/db.json"), "utf8", function (err, data) {
    if (err) {
      throw err;
    } else {
    //   console.log("test");
    //   console.log(data);
      return res.json(data);
    }
  });
});
////POST
app.post("/api/notes", function (req, res) {});
////DELETE
app.delete("/api/notes:id", function (req, res) {});

//Start server
app.listen(PORT, function () {
  console.log("Listening on port " + PORT);
});
