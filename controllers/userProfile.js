const profileHandler = (req, res, db) => {
    const {id} = req.params;
    db.select('*').from('users')
    .where({id})
    .then(user => {
        if(user.length){
            res.json(user[0])
        } else {
            res.status(404).json(`User with this profile not found`)
        }
        
    })
    .catch(err => {
        res.status(400).json('unable to retrieve user')
    })
};

const getAllUsers = (req, res, db) => {
    db.select('*').from('users')
    .then(users => {
        res.json(users[users.length - 1]);
    })
    .catch(err => {
        res.status(404).json("Error retrieving users")
    })
};

module.exports = {
    profileHandler,
    getAllUsers
}