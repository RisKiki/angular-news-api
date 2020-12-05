var config = {
    dbusername : process.env.DBUSERNAME,
    dbpassword : process.env.DBPASSWORD,
    dbname     : process.env.DBNAME,
    dburi      : process.env.DBURI,
    port       : process.env.PORT,
    secretToken: process.env.RANDOM_TOKEN_SECRET
}

module.exports = config;