'use strict';
module.exports = function (grunt) {
  grunt.config.init({});

  // Begin Styles
  require('./tasks/styles.js')(grunt);
  // End Styles

  // Begin JS
  require('./tasks/js.js')(grunt);
  // End JS

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
