require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Router = require('./routes/routes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');


//DB Connection
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}, () => {
    console.log("DB connected successfully...")
})


//Middleware Setup
app.use(cors());
app.use(cookieParser())    //<----- This middleware is needed to read Cookie from request. Without it, we'll get no req.cookie...
app.use(express.json())    //<----- this middleware is needed to read JSON from request. Without it, we'll get req.body == undefined.
app.use("/api", Router);


//serve client code in production mode
if(process.env.NODE_ENV === 'production') {

    //go to find static file in client/build
    app.use(express.static('client/build'));

    //serve index.html to client
    app.get('*', (req, res)=> {
        res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'))
    })
}

app.listen(process.env.PORT || 5000, () =>{
    console.log("Server listening at port 5000")
})