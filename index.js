'use strict';
var spdy = require('spdy');
var express = require('express');
var http = require('http');
var https = require('https');
var compression = require('compression');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
// Connect to MongoDB
/*mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});

// Populate databases with sample data
if (config.seedDB) { require('./config/seed'); }*/

// Setup server
var options = {
    key: fs.readFileSync(__dirname + '/keys/spdy-key.pem'),
    cert: fs.readFileSync(__dirname + '/keys/spdy-cert.pem'),
    ca: fs.readFileSync(__dirname + '/keys/spdy-csr.pem')
};

var app = express();
// var server = https.createServer(options, app);

var server = spdy.createServer(
    options,
    app
);

//process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


// Start server
function startServer() {
    server.listen("9000", "127.0.0.1", function() {
        console.log('Express server listening on %d, in %s mode', "9000", app.get('env'));
    });
}

setImmediate(startServer);


/////////////////////////////////////////////////////////
///
///
///
var env = app.get('env');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('appPath', path.join(__dirname, 'app/'));
app.set('tmp', path.join(__dirname, '.tmp/'));

//////////////////////////////
///
///
///
///
///

app.route('/*')
    .get(function(req, res) {
        var filePath;
        filePath = req.params[0];
        if (filePath && filePath.indexOf(".css") > 0) {
            res.sendFile(path.resolve(app.get('tmp') + filePath));
        } else if (filePath && filePath.indexOf(".") > 0) {
            res.sendFile(path.resolve(app.get('appPath') + filePath));
        } else {
            res.render(path.resolve(app.get('appPath') + '/index.html'), { randomStr: Math.floor(Math.random() * 10000000) });
        }
    });
// Expose app
exports = module.exports = app;
