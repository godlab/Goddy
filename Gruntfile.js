module.exports = function(grunt) {

  var config = {
    frente: {
      js: ['front/libs/jquery-2.0.3.js','front/libs/jquery.mobile-1.4.0.js','front/libs/angular.js','front/libs/angular-mocks.js'],
      css: ['front/themes/angular-csp.css','front/themes/goddy-theme.min.css','front/themes/jquery.mobile.flatui.icons.css','front/themes/jquery.mobile.structure-1.4.0.min.css']
    }
  };

  grunt.initConfig({
    concat: {
      options: {
        separator: ';'
      },
      js: {
        src: config.frente.js,
        dest: 'front/libs/libs.js'
      },
      css: {
        src: config.frente.css,
        dest: 'front/themes/libs.css'
      }
    },
    uglify: {
      dist: {
        files: {
          'front/libs/libs.js': ['<%= concat.js.dest %>']
        }
      }
    },
    cssmin: {
      options: {
        keepSpecialComments: 0
      },
      dist: {
        src: ['front/themes/libs.css'],
        dest: 'front/themes/libs.css'
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'qunit']
    },
    qunit: {
        files: ['front/test.html']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  // grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('test', ['qunit']);

  grunt.registerTask('default', ['concat','uglify','cssmin']);
}