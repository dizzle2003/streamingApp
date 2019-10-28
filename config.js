const PORT = process.env.PORT || 5000
module.exports = {
    dbConnection: {
        host : process.env.DB_HOST,
        user : process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_DATABASE
    },
    PORT  
}