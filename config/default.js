var defer = require('config/defer').deferConfig;
var path = require('path');

module.exports = {
  // secret data can be moved to env variables
  // or a separate config
  keys:   ['mysecret'],
  mongoose: {
    uri:     (process.env.MONGODB_URL || '127.0.0.1/')+'gift',
    options: {
      server: {
        socketOptions: {
          keepAlive: 1
        },
        poolSize:    5
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
      iterations: process.env.NODE_ENV == process.env.OPENSHIFT_ENV_VAR ? 12000 : 1
    }
  },
  redis: {
    password: process.env.REDIS_PASSWORD || 'ZTNiMGM0NDI5OGZjMWMxNDlhZmJmNGM4OTk2ZmI5',
    redis_cli: { 
    host: process.env.OPENSHIFT_REDIS_HOST || '127.0.0.1', 
    port: process.env.OPENSHIFT_REDIS_PORT
    // password: process.env.REDIS_PASSWORD
    }    
  },

  // "-h 127.8.43.3 -p 16379 -a ZTNiMGM0NDI5OGZjMWMxNDlhZmJmNGM4OTk2ZmI5"
  template: {
    // template.root uses config.root
    root: defer(function(cfg) {
      return path.join(cfg.projectRoot, 'templates');
    })
  },
  projectRoot:     process.cwd()  
};


