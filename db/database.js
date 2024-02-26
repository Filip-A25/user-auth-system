// Setup PostgreSQL database config.
const connection = {
    host: 'localhost', // Set your host name.
    port: 5432, // Set port (5432 is default is PostgreSQL). 
    database: 'user_auth_system', // Set name of the database.
    user: 'postgres', // Set database owner (postgres is default in PostgreSQL).
    password: 'password123' // Set Postgres password.
}

const connectDb = (database) => {
    database.connect()
    .then(() => {
        console.log(`Connected to ${database.database} database.`);
    }).catch ((err) => {
        console.log(`Error occured while connecting to ${database.database} database:`, err);
    })
}

const endDbConnection = (database) => {
    database.end()
    .then(() => {
        console.log(`Closed connection to ${database.database} database`);
    }).catch ((err) => {
        console.log(`Error occured while closing connection to ${database.database} database:`, err);
    })
}

module.exports = {connection, connectDb, endDbConnection};