//Handles retrieval of user profile by id
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

//Handles retrievalof of all user profiles
const getAllUsers = (req, res, db) => {
    db.select('*').from('users')
    .then(users => {
        res.json(users);
    })
    .catch(err => {
        res.status(404).json("Error retrieving users")
    })
};

/*Exporting all function objects handled by the user profile routes
    Using the Object freeze method to ensure objects exported are not modified
*/
module.exports = Object.freeze({
    profileHandler,
    getAllUsers
})