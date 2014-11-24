module.exports = function(grunt) {
  "use strict";

  grunt.loadNpmTasks('grunt-contrib-connect');


  grunt.initConfig({
    connect: {
      server: {
        options: {
          port: 1234,
          hostname: '*',
          onCreateServer: function(server, connect, options) {
            var io = require('socket.io').listen(server);
            io.sockets.on('connection', function(socket) {

            });
          }
        }
      }
    }
  });

};
