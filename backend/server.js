const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); //connect to mongodb


require('dotenv').config();

const app = express(); //create express server
const port = process.env.PORT || 5000;

app.use(cors()); //middleware
app.use(express.json()); //allows to parse json

const uri  = 'mongodb+srv://jasonex732:jasonex732@cluster0-izyis.gcp.mongodb.net/test?retryWrites=true&w=majority'//process.env.ALTAS_URI; //database uri, get from mongodb

mongoose.connect(uri, {useNewUrlParser : true, useCreateIndex: true, useUnifiedTopology: true}); //connect to database
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Mongodb database connection successful!");
})

const exercisesRouter = require('./routes/exercises'); //router files
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => { //starts the server
    console.log(`Server is running on ${port}`);
})