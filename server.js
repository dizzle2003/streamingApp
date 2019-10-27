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
const cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 5;
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
    const hash = bcrypt.hashSync(password, saltRounds);
    db.transaction(trx => {
        trx.insert({
            username: username,
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
            .returning('*')
            .insert({
                first_name: firstname,
                last_name: lastname,
                username: username,
                email: loginEmail[0], 
                genre: genre,
                joined: new Date()
            })
            .then(user => {
                res.json(user[0]);
            })
            .catch(err => {
                res.status(400).json("Unable to register!")
            })
        }) 
        .then(trx.commit)
    .catch(trx.rollback)
    }); 
});

//Sign-in Route
app.post('/signin', (req, res) => {
    const {email, password} = req.body;
    db.select('email', 'hash').from('login')//knex always returns an array
    .where('email', '=', email)
    .then(resp => {
        const userExists = bcrypt.compareSync(password, resp[0].hash);
        if (userExists){
            db.select('*').from('users')
            .where('email', '=', email)
            .then(user => {
                res.json(user[0]);
            })
            .catch(err => {
                res.status(400).json("unable to retrieve user");
            })
        } else {
                res.status(400).json("email or password invalid");
        }
    })
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