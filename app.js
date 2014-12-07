
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
var allVMIr=require('./routes/allVMIr');
var allVMIw=require('./routes/allVMIw');
var allVhIw=require('./routes/allVhIw');
var allVhIr=require('./routes/allVhIr');
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
app.get('/statusH',status.getStatusH);
app.get('/',status.getStatus);
app.get('/allVMMem',allVMMem.getAllMem);
app.get('/allVMMemH',allVMMem.getAllMemH);

app.get('/allVMCpu',allVMCPU.getAllCpu);
app.get('/allVMCpuH',allVMCPU.getAllCpuH);

app.get('/allVMNet',allVMNet.getAllNet);
app.get('/allVMNetH',allVMNet.getAllNetH);

app.get('/allVMIr',allVMIr.getAllIr);
app.get('/allVMIrH',allVMIr.getAllIrH);

app.get('/allVMIw',allVMIw.getAllIw);
app.get('/allVMIwH',allVMIw.getAllIwH);



app.get('/allVhCpu',allVhCpu.getAllCpu);
app.get('/allVhCpuH',allVhCpu.getAllCpuH);

app.get('/allVhMem',allVhMem.getAllMem);
app.get('/allVhMemH',allVhMem.getAllMemH);

app.get('/allVhNet',allVhNet.getAllNet);
app.get('/allVhNetH',allVhNet.getAllNetH);

app.get('/allVhIr',allVhIr.getAllIr);
app.get('/allVhIrH',allVhIr.getAllIrH);

app.get('/allVhIw',allVhIw.getAllIw);
app.get('/allVhIwH',allVhIw.getAllIwH);
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
