require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Router = require('./routes/routes');
const cookieParser = require('cookie-parser');
const cors = require('cors');


//DB Connection
mongoose.connect("mongodb://localhost:27017/mydb", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}, () => {
    console.log("DB connected successfully...")
})


//Middleware Setup
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(cookieParser())    //<----- This middleware is needed to read Cookie from request. Without it, we'll get no req.cookie...
app.use(express.json())    //<----- this middleware is needed to read JSON from request. Without it, we'll get req.body == undefined.
app.use("/", Router);


app.listen("5000", () =>{
    console.log("Server listening at port 5000")
})