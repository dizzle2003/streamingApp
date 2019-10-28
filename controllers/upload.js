const uploadHandler = (req, res, db) => {
    const {track_id, title, artist, audio_file, composer, album_art, track,length, media_type, genre, size} = req.body; 
        db('library').insert(
            {   track_id,
                title,
                artist,
                genre,
                composer,
                media_type,
                size,
                length,
                track
            })
            .then(resp => {
                res.json("upload successful");
            })
            .catch(err => {
                res.status(400).json('upload failed, please retry');
            });
};

module.exports = Object.freeze({
    uploadHandler
});

    
