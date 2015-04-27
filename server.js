var serverFactory = require('spa-server');

var server = serverFactory.create({
  fallback: '/index.html'
});

server.start();