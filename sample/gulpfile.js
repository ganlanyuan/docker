var config = {
  sassLang: 'libsass',
  
  browserSync: {
    server: {
      baseDir: "./"
    },
    open: false,
    notify: false
  },

  watch: {
    php: '**/*.php',
  },

  svgmin: {
    src: 'svg/**/*.svg',
    dest: 'svg-min/'
  },

  inject: {
    src: 'svg/currentColor/**/*.svg',
    target: './index.php',
    starttag: '<!-- inject:svg -->',
    dest: './'
  },
};

var gulp = require('gulp');
var sass;
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var svgstore = require('gulp-svgstore');
var path = require('path');
var svgmin = require('gulp-svgmin');
var inject = require('gulp-inject');
var browserSync = require('browser-sync').create();
var rename = require('gulp-rename');
var mergeStream = require('merge-stream');

function errorlog (error) {  
  console.error.bind(error);  
  this.emit('end');  
}  

// Svg Task
gulp.task('min', function () {
  return gulp.src(config.svgmin.src)
    .pipe(svgmin())
    .pipe(gulp.dest(config.svgmin.dest))
    .pipe(browserSync.stream());
});

gulp.task('inject', function () {
  function fileContents (filepath, file) {
    if (filepath.slice(-4) === '.svg') {
      return '<li><img src="' + filepath + '"><div class="icon-name">' + filepath.slice(filepath.search(/([^/]*)$/), -4) + '</div></li>';
    }
  }

  return gulp.src(config.inject.target)
    .pipe(inject(gulp.src(config.inject.src), {
      starttag: config.inject.starttag,
      transform: fileContents
    }))
    .pipe(gulp.dest(config.inject.dest))
    .pipe(browserSync.stream());
});

// server
gulp.task('browser-sync', function() {
  browserSync.init(config.browserSync);
});

gulp.task('watch', function () {
  gulp.watch(config.edit.src, ['min']);
  gulp.watch(config.watch.php).on('change', browserSync.reload);
  gulp.watch(config.watch.html).on('change', browserSync.reload);
});

// Default Task
gulp.task('default', [
  'min', 
  'inject', 
  'browser-sync', 
  'watch',
]);  