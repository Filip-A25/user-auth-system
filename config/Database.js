const connection = "postgres://postgres:password@localhost:5432/user_auth_system";

const authenticateConnection = (db) => {
    db.authenticate()
        .then(() => {
            console.log("Connection to database successfully established.");
        }).catch ((err) => {
            console.error("Unable to connect to database: ", err);
        })
}

const connectDatabase = (db) => {
    db.sync()
        .then(() => {
            console.log("Models are successfully synchronized.");
        }).catch((err) => {
            console.error("Unable to synchronize models: ", err);
        })
}

const closeDatabaseConnection = (db) => {
    db.close()
        .then(() => {
            console.log("Connection to database successfully closed.");
        }).catch((err) => {
            console.error("Unable to close database: ", err);
        }) 
}

module.exports = {connection, authenticateConnection, connectDatabase, closeDatabaseConnection}