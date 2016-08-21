'use strict';
const {task, series, dest} = require('gulp');
require('require-dir')('./gulp-tasks');

task('default', series('images', 'inject', 'generate-service-worker'));
