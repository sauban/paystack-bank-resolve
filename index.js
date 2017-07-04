var connect = require('connect');
var serveStatic = require('serve-static');
var port = process.env.PORT || 5000;
connect().use(serveStatic(__dirname + '/public')).listen(port, function () {
    console.info('Server running on ' + port + '...');
  });
