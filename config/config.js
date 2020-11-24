var config = {
    dbusername: "admin",
    dbpassword: "M2EjNAdUb5mSTgy",
    dbname    : "db1"
}

config.dburi = "mongodb+srv://admin:"+config.dbpassword+"@angular-news.5hyda.mongodb.net/"+config.dbname+"?retryWrites=true&w=majority"

module.exports = config;