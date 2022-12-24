const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const frontAuth = require('../api/middlewares/front/auth');
const frontRoutes = require('../api/routes/v1/front/index');
const adminRoutes = require('../api/routes/v1/admin/index');
const path = require('path');

/**
* Express instance
* @public
*/

const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "../uploads")));
app.use(express.static(path.join(__dirname, "../../admin/static/css")));

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

// authentication middleware to get token
app.use(frontAuth.authenticate);

// mount admin api v1 routes
app.use('/v1/admin', adminRoutes);

// mount admin api v1 routes
app.use('/v1/front', frontRoutes);


// Admin Site Build Path
app.use('/admin/', express.static(path.join(__dirname, '../../admin')))
app.get('/admin/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../../admin', 'index.html'));
});

// Front Site Build Path
app.use('/', express.static(path.join(__dirname, '../../build')))
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});

module.exports = app;