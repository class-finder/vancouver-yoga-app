var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname+'/www')).listen(8080);
console.log('Running on localhost:8080');

