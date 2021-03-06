/*
Build a simple audio streaming app
I should be able to register as a user with my email and password
I should be able to sign with my email and and password
I should be able to upload an audio file
I should be able to play the audio file from the page
I should be able to see audio files uploaded by other user
*/
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const config = require('./config');
const firebase = require('firebase/app');
require('firebase/database')
const firebaseDB = {
    connection: config.firebaseConnection
  };
var knex = require('knex');
const db = knex({
    client: 'pg',
    version: '7.2',
    connection: config.dbConnection
});
const login = require('./controllers/login');
const registration = require('./controllers/register');
const profile = require('./controllers/userProfile');
const upload = require('./controllers/upload');
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => res.send('Felix!!!!'));


//Registration Route
app.post('/register', async (req, res) => {
    registration.registrationHandler(req,res, db, bcrypt, saltRounds)
   
});

//Sign-in Route
app.post('/login', (req, res) => {
    login.loginHandler(req,res,db,bcrypt)
});

//user profile route
app.get('/profile/:id', (req, res) => {
    profile.profileHandler(req,res,db); 
});

//All users profile
app.get('/profile', (req, res) => {
    profile.getAllUsers(req, res, db);
});

//Upload and audio file
app.post('/upload', (req, res) => {
    upload.uploadHandler(req, res, db);
});

//Play audio
app.get('/play', (req, res) => {

});

//Get all audio files
app.get('/library', (req, res) => {
    library.getAllTracks(req, res, db);
});




app.listen(config.PORT, () => console.log(`Application is running on ${config.PORT}`));
