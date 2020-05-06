//App variables
const express = require("express");
const fs = require("fs");
const path = require("path");
let notesArray = [];

//Express server setup
const app = express();
let PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//Routes
////GET
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});
app.get("/api/notes", function (req, res) {
  fs.readFile(path.join(__dirname, "/db/db.json"), "utf8", function (
    err,
    data
  ) {
    if (err) {
      throw err;
    } else {
      notesArray = JSON.parse(data);
      for (let index in notesArray) {
        notesArray[index].id = index;
      }
      fs.writeFile(
        path.join(__dirname, "/db/db.json"),
        JSON.stringify(notesArray),
        "utf8",
        function (err) {
          if (err) {
            throw err;
          }
        }
      );
      return res.json(notesArray);
    }
  });
});
////POST
app.post("/api/notes", function (req, res) {
  fs.readFile(path.join(__dirname, "/db/db.json"), "utf8", function (
    err,
    data
  ) {
    //turn this into a function and then call it from within a async await
    if (err) {
      throw err;
    } else {
      notesArray = JSON.parse(data);
      let newNote = req.body;
      notesArray.push(newNote);
      fs.writeFile(
        path.join(__dirname, "/db/db.json"),
        JSON.stringify(notesArray),
        "utf8",
        function (err) {
          if (err) {
            throw err;
          }
        }
      );
      return res.json(notesArray);
    }
  });
});
////DELETE
app.delete("/api/notes:id", function (req, res) {
  fs.readFile(path.join(__dirname, "/db/db.json"), "utf8", function (
    err,
    data
  ) {
    if (err) {
      throw err;
    } else {
      notesArray = JSON.parse(data);
      notesArray.splice(parseInt(req.params.id.substr(1)), 1);
      fs.writeFile(
        path.join(__dirname, "/db/db.json"),
        JSON.stringify(notesArray),
        "utf8",
        function (err) {
          if (err) {
            throw err;
          }
        }
      );
      return res.json(notesArray);
    }
  });
});

//Start server
app.listen(PORT, function () {
  console.log("Listening on port " + PORT);
});
