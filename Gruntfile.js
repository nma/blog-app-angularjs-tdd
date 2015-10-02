'use strict';

module.exports = function(grunt) {

  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  // Define our output code package
  var path = {
    client: 'src/client',
    test: 'test/',
    dist: {
      base: 'public',
      static: 'public/static'
    }
  };

  grunt.loadNpmTasks('grunt-uncss');

  // Define the configuration for all the tasks
  grunt.initConfig({
    concat: {
      js: {
        src: [
          path.client + '/vendor/jquery/jquery.min.js',
          path.client + '/vendor/angular/angular.min.js',
          path.client + '/vendor/qstrap/dist/js/qstrap.min.js',
          path.client + '/js/**/*.js',
        ],
        dest: path.dist.base + '/js/angular-demo.js'
      },
      css: {
        src: [
          path.client + '/vendor/qstrap/dist/css/qstrap.min.css',
          path.client + '/css/**/*.css'
        ],
        dest: path.dist.base + '/css/angular-demo.css'
      }
    },
    copy: {
      app: {
        expand: true,
        cwd: path.client,
        src: 'index.html',
        dest: path.dist.base + '/'
      },
      qstrapimg: {
        expand: true,
        cwd: path.client + '/vendor/qstrap/dist/img',
        src: '**/*',
        dest: path.dist.base + '/img/'
      },
      fonts: {
        expand: true,
        cwd: path.client + '/vendor/qstrap/dist/fonts',
        src: '**/*',
        dest: path.dist.base + '/fonts/'
      }
    },
    clean: {
      options: {
        force: true
      },
      dist: {
        files: [{
          dot: true,
          src: [path.dist.base]
        }]
      }
    },
    karma: {
        options: {
            configFile: path.test + '/client/conf/karma.conf.js'
        },
        unit: {
            singleRun: true,
            browsers: ['PhantomJS']
        },
        watch: {
            background: true,
            browsers: ['PhantomJS']
        }
    }
  });
  
  // lets only keep what we need for now
  grunt.registerTask('build', [
    'clean',
    'concat',
    'copy'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);

  grunt.registerTask('test-client', [
    'build',
    'karma:unit'
  ]);

};
