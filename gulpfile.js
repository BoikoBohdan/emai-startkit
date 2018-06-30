var gulp = require('gulp'),
    sass = require('gulp-sass'),
    inky = require('inky'),
    browserSync = require('browser-sync'),
    inlineCss = require('gulp-inline-css'),
    imagemin = require('gulp-imagemin'),
    inlinesource = require('gulp-inline-source');


//STYLES
gulp.task('styles', function () {
  return gulp.src('./scss/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./templates'))
});

//CONVERTE INKY
gulp.task('inky', ['styles'], function() {
  return gulp.src('./templates/**/*.html')
    .pipe(inlinesource())
    .pipe(inky())
    .pipe(inlineCss({
        preserveMediaQueries: true,
        removeLinkTags: false
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.reload({stream: true}));
});

// images
gulp.task('img', function() {
  gulp.src('img/*')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/img'))
});

//Bower Livereload
gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: 'dist' // Директория для сервера - app
        },
        notify: true // Отключаем уведомления
    });
});

//WATCH
gulp.task('default', ['browser-sync'], function() {
   gulp.watch(['./scss/**/*.scss', './templates/**/*.html'],['inky']);
});