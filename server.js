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
const fs = require('fs');
const cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const config = require('./config');
const PORT = process.env.PORT || 5000;
var knex = require('knex');
const db = knex({
    client: 'pg',
    version: '7.2',
    connection: config.dbConnection
  });
const login = require('./controllers/login');
const profile = require('./controllers/userProfile')
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Felix!!!!')
})


//Registration Route
app.post('/register', async (req, res) => {
    const {firstname, lastname, username, genre, email, password} = req.body;
    const hash = bcrypt.hashSync(password, saltRounds);
    db.transaction(trx => {
        trx.insert({
            username,
            hash,
            email
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
    const {track_id, title, artist, audio_file, composer, media_type, genre, bytes} = req.body;
   

});

//Play audio
app.get('/play', (req, res) => {
    fs.statSync('/malaria.mp3');
})

//Get all audio files
app.get('/library', (req, res) => {

})


app.listen(PORT, () => console.log(`Application is running on ${PORT}`));

// await db.transaction(async trx => {
//     try {
//         let [loginEmail] = await trx.insert({
//             username,
//             hash,
//             email
//         }).into('login').returning('email');

//         let user =  await trx('users').returning('*')
//         .insert({
//             first_name: firstname,
//             last_name: lastname,
//             username: username,
//             email: loginEmail, 
//             genre,
//             joined: new Date()
//         });

//         await trx.commit();
//         res.json({ user })
//     } catch (err) {
//         trx.rollback();
//     }
// });