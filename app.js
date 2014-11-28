
/**
 * Module dependencies.
 */

var express = require('express')
//  , routes = require('./routes')
  
  , http = require('http')
  , path = require('path');
var status = require('./routes/status');
var allVMMem  = require('./routes/allVMMem');
var allVMCPU= require('./routes/allVMCPU');
var allVMNet= require('./routes/allVMNet');
var allVhNet = require ('./routes/allVhNet');
var allVhCpu = require ('./routes/allVhCpu');
var allVhMem = require ('./routes/allVhMem');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/status',status.getStatus);
app.get('/',status.getStatus);
app.get('/allVMMem',allVMMem.getAllMem);
app.get('/allVMCpu',allVMCPU.getAllCPU);
app.get('/allVMNet',allVMNet.getAllNet);
app.get('/allVhNet',allVhNet.getAllNet);
app.get('/allVhCpu',allVhCpu.getAllCpu);
app.get('/allVhMem',allVhMem.getAllMem);
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
