'use strict';
const {task, series} = require('gulp');
const {readFile, writeFile, mkdir} = require('fs');
const del = require('del');

class Inject {
  getImages(cb) {
    var calls = 0;
    try {
      readFile('images.json', (err, data) => {
        data = JSON.parse(data);

        var items = [];
        for (let images of data) {
          var item = {};
          calls += 1;
          for (let key of Object.keys(images)) {
            if (images[key].placeholder) {
              item.name = key;
              item.placeholder = images[key].placeholder;
              item.image = `/images/${key}.png`;
              items.push(item);
            }
            if (calls === data.length) {
              cb(items);
            }
          }
        }
      });
    } catch (err) {
      cb(err)
    }
  }

  injectImages(images, cb) {
    try {
      readFile('src/kleinklusjes-data.html', (err, data) => {
        data = data.toString();
        let match = data.match(/<script>(\W*)(.*)(\W*)(.*)(\W*)/g);
        var i =( data.indexOf(match) + match[0].length);
        var start = data.slice(0, i);
        var end = data.slice(i);
        var b = 'var images = ';
        b += JSON.stringify(images) + '\n' + '\t';
        start += b;
        start += end;
        data = start;
          // mkdir('dist');
          writeFile('dist/kleinklusjes-data.html', data, () => {
          cb();
        })
      });
    } catch (err) {
      cb(err);
    }
  }
}

task('inject:images', cb => {
  const inject = new Inject();
  inject.getImages(images => {
    inject.injectImages(images, cb);
  });
});

task('inject:clean', () => {
  return del(['dist/**/*']);
});

task('inject', series('inject:clean', 'inject:images'));
