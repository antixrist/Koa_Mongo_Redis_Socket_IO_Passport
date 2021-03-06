var defer = require('config/defer').deferConfig;
var path = require('path');

module.exports = {
  // secret data can be moved to env variables
  // or a separate config
  keys:   ['mysecret'],
  mongoose: {
    uri:     'mongodb://localhost/test',
    options: {
      server: {
        socketOptions: {
          keepAlive: 1
        },
        poolSize:      5
      },
      db : {
        nativeParser: true
      }
    }
  },
  crypto: {
    hash: {
      length:     128,
      // may be slow(!): iterations = 12000 take ~60ms to generate strong password
      iterations: process.env.NODE_ENV == 'production' ? 12000 : 1
    }
  },
  template: {
    // template.root uses config.root
    root: defer(function(cfg) {
      return path.join(cfg.projectRoot, 'templates');
    })
  },
  projectRoot:     process.cwd()
};


