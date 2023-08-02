
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const productRoute = require('./routes/productRoute');
const errorMiddleware = require('./middleware/errorMiddleware');
const cors = require('cors');

const app = express();



const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 3000;
const SERVER_URL = process.env.SERVER_URL;

var corsOptions = {
    origin: SERVER_URL,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }


app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// Routes
// request= client send to node APP
// response =  node APP send to client
app.use('/api/products', productRoute);


// Add the error middleware
if (app.use(errorMiddleware)) {
    console.log("mount middileware");
} else {
    console.log("not working middleware");
}

//An error handling middleware
// app.use(function(err, req, res, next) {
//     console.log('middleware working');
//     res.status(500);
//     res.send("Oops, something went wrong.")
//  });


mongoose.connect(MONGO_URL)
    .then(() => {
        console.log('connected to mongodb');
        // this app satrt server  and listen on port 3000 for connection 
        app.listen(PORT, () => {
            console.log(`Node api is running on port 3000`)
        });
    }).catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    })