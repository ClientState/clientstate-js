module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha'],
    files: [
      //'lib/JSONP.js',
      //'bower_components/oauth-js/dist/oauth.min.js',
      'js/clientstate.redis.js',
      'bower_components/chai/chai.js',
      'tests/*.js'
    ],
    browsers: ['Chrome'],
    singleRun: true,
    reporters: ['progress', 'coverage'],
    preprocessors: { 'js/clientstate.redis.js': ['coverage'] }
  });
};