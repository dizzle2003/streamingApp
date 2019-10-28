const registrationHandler = (req, res, db, bcrypt, saltRounds) => {
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
                username,
                email: loginEmail[0], 
                genre,
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
};

module.exports = Object.freeze({
    registrationHandler
})