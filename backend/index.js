const express = require('express');
const app = express();
const env = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


//Connecting to the local database
mongoose.connect('mongodb://localhost:27017/flipkartClone')
    .then(() => console.log('connected to database'))
    .catch((err) => console.log("some error occured to connect to database"))

//Enabling the enviroment config
env.config();

//Middleware to parse the JSON format
app.use(bodyParser.urlencoded({
    extended: true
}));

//imortint the routes
const userRoute=require('./routes/user');



//API
app.use('/api',userRoute);



//Listing to the Port
app.listen(process.env.PORT, () => {
    console.log(`Listing to the port ${process.env.PORT}`);
})