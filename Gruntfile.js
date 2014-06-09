'use strict';

module.exports = function(grunt) {

  // Configurable paths
  var myConfig = {
    src: 'src',
    dist: 'dist'
  };

  // Load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    path: myConfig,
    meta: {
      banner: '/**\n' +
        ' * <%= pkg.name %>\n' +
        ' * @version v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
        ' * @license MIT License, http://www.opensource.org/licenses/MIT\n' +
        ' */\n'
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= path.dist %>/*',
            '!<%= path.dist %>/.git*'
          ]
        }]
      }
    },
    jshint: {
      src: {
        options: {
          reporter: require('jshint-stylish'),
        },
        src: ['<%= path.src %>/**/*.js']
      }
    },
    concat: {
      options: {
        banner: '<%= meta.banner %>',
        stripBanners: true
      },
      dist: {
        src: ['<%= path.src %>/<%= pkg.name %>.js',
              '<%= path.src %>/**/*.js'
              
             
             ],
        dest: '<%= path.dist %>/<%= pkg.name %>.min.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= meta.banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: '<%= path.dist %>/<%= pkg.name %>.min.js'
      }
    },
    less: {
      development: {
          files: {
            '<%= path.dist %>/<%= pkg.name %>.css': '<%= path.src %>/<%= pkg.name %>.less'
          }
      }
    }
  });
  
  grunt.registerTask('build', ['clean:dist','concat:dist','jshint','less']);
  grunt.registerTask('buildMin', ['build','uglify:dist']);
  grunt.registerTask('default', ['buildMin']);

};