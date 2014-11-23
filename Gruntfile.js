'use strict';

var package_info = require('./package.json');
var fs = require('fs');


module.exports = function(grunt) {
    // Project configuration.
    var gruntConf = {
        watch: {
            options: {
                nospawn: true
            },
            default: {
                files: ['./**/*.coffee'],
                tasks: ['coffee', 'browserify']
            }
        },
        coffee: {
            compile: {
                files: {
                    "js/clientstate.js": "coffee/clientstate.coffee",
                    "tests/clientstate-test.js": "tests/clientstate-test.coffee"
                },
                options: {
                    bare: true
                }
            }
        },
        concurrent: {
            server: {
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        concat: {
            options: {
              separator: ';',
            },
            dist: {
              src: ['bower_components/oauth-js/dist/oauth.min.js', 'js/clientstate.js'],
              dest: 'dist/clientstate.js',
            }
        },
        browserify: {
            dist: {
                files: {
                    './dist/clientstate.min.js': ['dist/clientstate.js']
                }
            }
        },
        uglify: {
            my_target: {
                files: {
                    './dist/clientstate.min.js': ['dist/clientstate.min.js']
                }
            }
        },
        jasmine_node: {

            options: {
                forceExit: true,
                match: '.',
                matchall: false,
                extensions: 'js',
                specNameMatcher: 'spec'
            },
            all: ['tests/unit/spec/']
        },

        taskDefault: ['coffee', 'concat', 'browserify', 'uglify']
    };

    grunt.initConfig(gruntConf);

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-jasmine-node');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('coverage', 'Creates a tests coverage report', function() {
        var exec = require('child_process').exec;
        var done = this.async();
        exec('./node_modules/karma/bin/karma start karma.conf.js', function(error, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
            console.log("Coverage report(s) available in coverage dir");
            done();
        });
    });

    // Default task.
    grunt.registerTask('default', gruntConf.taskDefault);
    grunt.registerTask('test', ['coffee', 'concat', 'browserify', 'uglify', 'coverage'])

};