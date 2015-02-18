/*
 * slush-wean
 * https://github.com/arvindr21/slush-wean
 *
 * Copyright (c) 2014, Arvind Ravulavaru
 * Licensed under the MIT license.
 */

'use strict';

var gulp = require('gulp'),
  install = require('gulp-install'),
  conflict = require('gulp-conflict'),
  template = require('gulp-template'),
  rename = require('gulp-rename'),
  _ = require('underscore.string'),
  inquirer = require('inquirer');

function format(string) {
  var username = string ? string.toLowerCase() : '';
  return username.replace(/\s/g, '');
}

var defaults = (function() {
  var homeDir = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE,
    workingDirName = process.cwd().split('/').pop().split('\\').pop(),
    osUserName = homeDir && homeDir.split('/').pop() || 'root',
    configFile = homeDir + '/.gitconfig',
    user = {};
  if (require('fs').existsSync(configFile)) {
    user = require('iniparser').parseSync(configFile).user;
  }
  return {
    appName: workingDirName,
    userName: format(user.name) || osUserName,
    authorEmail: user.email || ''
  };
})();

gulp.task('default', function(done) {
  var prompts = [{
    name: 'appName',
    message: 'What is the name of your project?',
    default: defaults.appName
  }];
  //Ask
  inquirer.prompt(prompts,
    function(answers) {
      if (!answers.appName) {
        return done();
      }
      answers.appNameSlug = _.slugify(answers.appName);
      answers.isWin = /^win/.test(process.platform);
      gulp.src([__dirname + '/templates/fonts/**'])
        .pipe(conflict('./app/public/fonts/'))
        .pipe(gulp.dest('./app/public/fonts/'));

      gulp.src(__dirname + '/templates/app/**')
        .pipe(template(answers))
        .pipe(rename(function(file) {
          if (file.basename[0] === '_') {
            file.basename = '.' + file.basename.slice(1);
          }
        }))
        .pipe(conflict('./'))
        .pipe(gulp.dest('./'))
        .pipe(install())
        .on('end', function() {
          done();
        });
    });
});
