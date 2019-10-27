const login = (req, res, db, bcrypt) => {
    const {email, password} = req.body;
    db.select('email', 'hash').from('login')//knex always returns an array
    .where('email', '=', email)
    .then(resp => {
        const userExists = bcrypt.compareSync(password, resp[0].hash);
        if (userExists){
            db.select('*').from('users')
            .where('email', '=', email)
            .then(user => res.json(user[0])
            )
            .catch(err => {
                res.status(400).json("unable to retrieve user");
            })
        } else {
                res.status(400).json("email or password invalid");
        }
    })
}

module.exports = Object.freeze({
    loginHandler: login
});
