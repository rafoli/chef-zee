// Constants
const API_URL     = "http://localhost:5000/";
const DEV_API_URL = "http://localhost:5000/";

const gulp = require('gulp');
const serve       = require('gulp-serve');
const mocha = require('gulp-mocha');

gulp.task('test', () => {
    return gulp.src('test.js', {read: false})
        // gulp-mocha needs filepaths so you can't have any plugins before it
        .pipe(mocha({reporter: 'nyan'}));
});

// Local Server
gulp.task('dev-server', serve({
  root: ['app'],
  port: 8080
}));

