#!/usr/bin/env node

const express = require('express');
const serveStatic = require('serve-static');
const Q = require('q');

const serve = function(folder, port) {
  port = port || 1234;

  const app = express();
  var server;

  const start = function() {
    let deferred = Q.defer();
    app.use(serveStatic(folder));
    server = app.listen(port, () => {
      deferred.resolve();
    });
    return deferred.promise;
  };

  const stop = function() {
    let deferred = Q.defer();
    server.close(deferred.resolve);
    return deferred.promise;
  };

  return {start, stop};
};

if (require.main === module) {
  serve(process.argv[2], process.argv[3]).start();
} else {
  module.exports = serve;
}
