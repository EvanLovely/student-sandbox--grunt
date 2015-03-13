module.exports = function (grunt, config) {
  "use strict";
  var jsDir = "js/";
  grunt.config.merge({
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
    watch: {
      js: {
        files: "<%= jshint.js.files.src %>",
        tasks: [
          //"shell:livereload",
          "newer:jshint:js"
        ]
      }
    }
  });
};