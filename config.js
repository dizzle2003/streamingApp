const PORT = process.env.PORT || 5000
module.exports = {
    dbConnection: {
        host : process.env.DB_HOST,
        user : process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_DATABASE
    },
    firebaseConnection: {
        apiKey: process.env.FIREBASE_API,
        authDomain: process.env.AUTH_DOMAIN,
        databaseURL: process.env.DATABASE_URL,
        projectId: process.env.PROJECT_ID,
        storageBucket: process.env.STORAGE_BUCKET,
        messagingSenderId: "sender-id",
        appId: "app-id",
        measurementId: "G-measurement-id"
    },
    PORT  
}