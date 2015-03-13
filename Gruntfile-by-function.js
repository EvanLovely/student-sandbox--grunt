'use strict';
module.exports = function (grunt) {
  var scssDir = "scss/";
  var scssConfigRoot = "./"; // where `config.rb` and `Gemfile` exist
  var jsDir = "js/";
  grunt.config.init({
    shell: {
      stylesCompile: {
        command: "cd " + scssConfigRoot + " && bundle exec compass compile"
      }
    },
    jshint: {
      options: {
        jshintrc: ".jshintrc",
        force: true
      },
      js: {
        files: {
          src: [
            jsDir + "**/*.js",
            "!" + jsDir + "lib/**",
            "Gruntfile.js"
          ]
        }
      }
    },
    scsslint: {
      "options": {
        "bundleExec": scssConfigRoot,
        "config": scssConfigRoot + ".scss-lint.yml",
        "force": true,
        "maxBuffer": 999999,
        "colorizeOutput": true,
        "compact": true
      },
      styles: {
        src: "<%= watch.styles.files %>"
      }
    },
    watch: {
      styles: {
        files: scssDir + "**/*.scss",
        tasks: [
          "shell:stylesCompile",
          "newer:scsslint:styles" // only lint the newly change files
        ]
      },
      js: {
        files: "<%= jshint.js.files.src %>",
        tasks: [
          //"shell:livereload",
          "newer:jshint:js"
        ]
      }
    }
  });
    
  require("load-grunt-tasks")(grunt);
  grunt.registerTask('validate', [
    'scsslint',
    'jshint'
  ]);
  grunt.registerTask('compile', [
    'shell:stylesCompile'
  ]);
  grunt.registerTask('default', [
    'validate',
    'compile',
    'watch'
  ]);

};
