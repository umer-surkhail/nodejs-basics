const { port } = require('./config/vars');
const mongoose = require('./config/mongoose');
const app = require('./config/express');
const http = require('http');
mongoose.connect();
http.createServer(app).listen(port);
console.log(`App is running on ${port}`)
module.exports = app;