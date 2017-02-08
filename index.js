'use strict';

///////////////////////
// Requiring Modules //
///////////////////////
var spdy = require('spdy');
var express = require('express');
var http = require('http');
var https = require('https');
var compression = require('compression');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');


///////////////
// App Setup //
///////////////
var app = express();
var env = app.get('env');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('appPath', path.join(__dirname, 'app/'));
app.set('tmp', path.join(__dirname, '.tmp/'));

////////////
// Routes //
////////////
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

//////////////////
// Server Setup //
//////////////////
var options = {
    key: fs.readFileSync(__dirname + '/keys/spdy-key.pem'),
    cert: fs.readFileSync(__dirname + '/keys/spdy-cert.pem'),
    ca: fs.readFileSync(__dirname + '/keys/spdy-csr.pem')
};

// var server = https.createServer(options, app);
var server = spdy.createServer(
    options,
    app
);

//////////////////
// Start server //
//////////////////
function startServer() {
    server.listen("9000", "127.0.0.1", function() {
        console.log('Express server listening on %d, in %s mode', "9000", app.get('env'));
    });
}

setImmediate(startServer);

////////////////
// Expose App //
////////////////
exports = module.exports = app;
