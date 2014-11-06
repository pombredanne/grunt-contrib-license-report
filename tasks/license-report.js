'use strict';


module.exports = function(grunt) {
  var checker = require('license-checker'),
    sanitize = require('./lib/sanitize'),
    fs = require('fs'),
    project = require('../package.json');

  grunt.registerMultiTask('license-report', 'Discovers all licenses used in one package and generates a small HTML report.', function () {
// Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({});
    var done = this.async();

    checker.init({
      start: './'
    }, function (json) {

      var output = '<!DOCTYPE html>\n<html><head><title>License report for ' + project.name + ' v' + project.version + '</title>\n' +
        '<style type="text/css">\n' +
        'html, body {\n' +
        'background-color: #FFFFFF;\n' +
        'color: #333333\n' +
        'padding: 0:\n' +
        'margin: 0;\n' +
        '}\n' +
        'table th, td {\n' +
        'text-align: left;\n' +
        '}</style>\n</head>\n<body>\n<h1>License report for ' + project.name + ' v' + project.version + '</h1>\n<table border="1">\n<tr>\n<th>Project</th><th>License</th><th>Repository</th>\n</tr>';

      var jsonObj = Object.getOwnPropertyNames(json);

      jsonObj.forEach(function (value) {

        output += '\n<tr>\n<td>' + value + '</td>';



        output += '\n<td>' + sanitize(json[value].licenses) + '</td>';
        output += '\n<td><a href="' + json[value].repository + '" target="_blank">' + json[value].repository + '</a></td>\n</tr>';
      });

      output += '\n</table></body></html>';

      // Write the destination file
      grunt.file.write('./licenses.html', output);
      // Print a success message
      grunt.log.writeln('File licenses.html created.');

      done();
    });
  });
};