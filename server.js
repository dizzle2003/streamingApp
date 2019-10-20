const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const PORT = process.env.PORT || 5000;
var knex = require('knex');
const db = knex({
    client: 'pg',
    version: '7.2',
    connection: {
      host : '127.0.0.1',
      user : '',
      password : '',
      database : 'audiophile'
    }
  });

app.use(cors);


app.get('/', (req, res) => {
    res.send('Aloha!!!!')
})

/*
Build a simple audio streaming app
I should be able to register as a user with my email and password
I should be able to sign with my email and and password
I should be able to upload an audio file
I should be able to play the audio file from the page
I should be able to see audio files uploaded by other user
*/

//Registration Route
app.put('/register', (req, res) => {
    const {username, email, password} = req.body;
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
    res.send(req.query.name);
})

//Get all audio files
app.get('/library', (req, res) => {

})


app.listen(PORT, () => console.log(`Application is running on ${PORT}`));