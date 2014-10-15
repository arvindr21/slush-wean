var gulp = require('gulp')
var shell = require('gulp-shell')

// Run project
gulp.task('run', shell.task([
    <% if(isWin) { %> 'node node_modules/node-webkit-builder/bin/nwbuild -v 0.10.5 --run ./' <% } %><% if(!isWin) { %> 'node node_modules/node-webkit-builder/bin/nwbuild -v 0.10.5 --run ./' <% } %>
]));

// Compile project
gulp.task('build-osx', shell.task([
	<% if(isWin) { %> 'node node_modules/node-webkit-builder/bin/nwbuild -v 0.10.5 -p osx ./' <% } %><% if(!isWin) { %> 'node node_modules/node-webkit-builder/bin/nwbuild -v 0.10.5 -p osx ./' <% } %>
]));

// Compile project
gulp.task('build-win', shell.task([
	<% if(isWin) { %> 'node node_modules/node-webkit-builder/bin/nwbuild -v 0.10.5 -p win ./' <% } %><% if(!isWin) { %> 'node node_modules/node-webkit-builder/bin/nwbuild -v 0.10.5 -p win ./' <% } %>
]));

// Compile project
gulp.task('build-linux', shell.task([
	<% if(isWin) { %> 'node node_modules/node-webkit-builder/bin/nwbuild -v 0.10.5 -p linux32,linux64 ./' <% } %><% if(!isWin) { %> 'node node_modules/node-webkit-builder/bin/nwbuild -v 0.10.5 -p linux32,linux64 ./' <% } %>
]));
