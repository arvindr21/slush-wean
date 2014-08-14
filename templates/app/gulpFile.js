var gulp = require('gulp')
var shell = require('gulp-shell')

// Run project
gulp.task('run', shell.task([
    'node_modules/node-webkit-builder/bin/nwbuild -v 0.10.1 --run ./'
]));

// Compile project
gulp.task('osx', shell.task([
    'node_modules/node-webkit-builder/bin/nwbuild -v 0.10.1 -p osx ./'
]));

// Compile project
gulp.task('win', shell.task([
    'node_modules/node-webkit-builder/bin/nwbuild -v 0.10.2 -p win ./'
]));

// Compile project
gulp.task('linux', shell.task([
    'node_modules/node-webkit-builder/bin/nwbuild -v 0.10.2 -p linux32,linux64 ./'
]));
