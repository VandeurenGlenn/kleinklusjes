'use strict';
const {task} = require('gulp');
var path = require('path');
var swPrecache = require('sw-precache');
var rootDir = '';

task('generate-service-worker', cb => {
  swPrecache.write(path.join('build/bundled', 'service-worker.js'), {
    staticFileGlobs: ['index.html', 'src/**/*.html', '!src/kleinklusjes-data.html', 'images/**/*.{png,jpg,gif,svg}', 'bower_components/{webcomponentsjs,polymer}/*.{js,html}', 'bower_components/roboto/**/*.{css,woff,woff2}']
  }, cb);
});
