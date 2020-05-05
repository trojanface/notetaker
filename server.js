const express = require("express");
const fs = require("fs");
const path = require("path");

//Express server setup
const app = express();
let PORT = process.env.PORT || 3000;
app.use(express.urlencoded({extended: true}));
app.use(express.json());


//Start server
app.listen(PORT, function() {
    console.log("Listening on port "+ PORT);
})