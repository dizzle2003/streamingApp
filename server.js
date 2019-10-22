/*
Build a simple audio streaming app
I should be able to register as a user with my email and password
I should be able to sign with my email and and password
I should be able to upload an audio file
I should be able to play the audio file from the page
I should be able to see audio files uploaded by other user
*/

const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');
const bcrypt = require('bcrypt');
const PORT = process.env.PORT || 5000;
var knex = require('knex');
const db = knex({
    client: 'pg',
    version: '7.2',
    connection: {
      host : '127.0.0.1',
      user : 'dajalie',
      password : '',
      database : 'audiophile'
    }
  });
const { Readable } = require('stream');

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Felix!!!!')
})


//Registration Route
app.post('/register', (req, res) => {
    const {firstname, lastname, username, genre, email, password} = req.body;
    db('users')
    .returning('*')
    .insert({
        first_name: firstname,
        last_name: lastname,
        username: username,
        email: email, 
        preferred_genre: genre,
        joined: new Date()
    })
    .then(user => {
        res.json(user[0]);
    })
    .catch(err => {
        res.status(400).json("Unable to register!")
    })
});

//Sign-in Route
app.post('/sign-in', (req, res) => {
    const {email, password} = req.body;
});

//Upload and audio file
app.post('/upload', (req, res) => {
    const {track_id, title, artist, audio_file, composer, media_type, genre, bytes} = req.body;

});

//Play audio
app.get('/play', (req, res) => {

})

//Get all audio files
app.get('/library', (req, res) => {

})


app.listen(PORT, () => console.log(`Application is running on ${PORT}`));