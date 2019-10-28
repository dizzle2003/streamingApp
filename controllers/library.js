const getAllTracks = (req, res, db) => {
    db.select('*').from('library')
    .then(playlist => res.json(playlist))
    .catch(err => res.status(400).json("error retrieving playlist"));  
}

module.exports = {
    getAllTracks
}