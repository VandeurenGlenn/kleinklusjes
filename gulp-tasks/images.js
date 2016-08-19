'use strict';
const {task, series, src, dest} = require('gulp');
const del = require('del');
const lwip = require('gulp-lwip');
const base64Img = require('gulp-base64-img');
const replace = require('gulp-replace');
const append = require('gulp-append');
const nameFromPath = require('name-from-path');

task('images:scale', () => {
  return src('images/**/*.{jpg,png}')
    .pipe(lwip.resize(5))
    .pipe(dest('.tmp/_images/'));
});

task('images:placeholders-base64', () => {
  return src('.tmp/_images/**/*.{jpg,png}')
    .pipe(base64Img())
    .pipe(append('images.json', {
      transform: {
        name: function(file) {
          return nameFromPath(file, true);
        },
        contents: function(file) {
          return 'placeholder'
        }
      },
      named: true
    }));
});

task('images:clean', () => {
  return del(['images/**/*.json', '.tmp/_images/**/*.{png,jpg}', 'images.json']);
});

task('images:placeholders', series('images:scale', 'images:placeholders-base64'));

task('images', series('images:clean', 'images:placeholders'))
