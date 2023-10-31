const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser')
const db = require('./connections/mongodb')
require("dotenv").config({ path: "./config.env" });

const app = express()
const port = process.env.PORT 

app.use(
  cors({
    origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
    })
    );
app.use(bodyParser.json())
require("./routes/routes")(app);
app.listen(port, ()=>{console.log(`Server running on: http://localhost:${port}`)})

db.on("error", console.error.bind(console, "MongoDB connection Error"));
db.once("open", function () {
console.log("MongoDB connected successfully");
});