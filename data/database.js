const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;

let database;

const intDb = (callback) => {
    if (database) {
        console.log('Database connection already established.');
        return callback(null, database);
    }

    MongoClient.connect(process.env.MONGODB_URL)
    .then((client) => {
        database = client.db();
        callback(null, database);
    })
    .catch((err) => {
        callback(err, null);
    });
};

const getDatabase = () => {
    if (!database) {
        throw Error('Database not initialized.');
    }
    return database;
};

module.exports = {
    initDb: intDb,
    getDatabase
};