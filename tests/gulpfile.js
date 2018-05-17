const gulp = require('gulp');
const gulpMocha = require('gulp-mocha')
require('./testhelper');


gulp.task('test-helper', function (done) {
  gulp.src('./testhelper.js')
  done();
})


gulp.task('test-server', gulp.series('test-helper', function (done) {
  return gulp.src('./server/server.test.js')
    .pipe(gulpMocha({
      reporter: 'spec',
      //globals: {
      //  sinon: require('sinon')
      //}
    }))
  done();
}));

gulp.task('test-routes', gulp.series('test-helper', 'test-server', function (done) {
  return gulp.src('./server/routes.test.js')
    .pipe(gulpMocha())
  done();
}));

gulp.task('build', gulp.series('test-helper', 'test-server', 'test-routes', function (done) {
  done();
}));
