const http = require('http');
const dotenv = require('dotenv');
dotenv.config();

const app  = require('./app');
const server = http.createServer(app);
const port = process.env.PORT || 3000;

server.listen(port);