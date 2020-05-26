const gulp = require('gulp')
const del = require('del')
const exec = require('child_process').exec

const paths = {
  dist: './dist/',
  typesIndex: './src/index.ts'
}

gulp.task('tsc:clean', function () { // we should not usually clean this to enable incremental build
  return del([
    paths.dist + '*',
  ])
})

gulp.task('tsc:run', function () {
  return new Promise(function (resolve, reject) {
    exec('tsc', function (err, stdout, stderr) {
      if (err) {
        console.log(stdout)
        console.log(stderr)
        reject(err)
      } else {
        resolve()
      }
    })
  })
})

gulp.task('tsc:copyTypes', function () {
  return gulp.src(paths.typesIndex)
    .pipe(gulp.dest(paths.dist));
})


gulp.task('tsc',
  gulp.series(
    'tsc:clean', // in theory, we should not usually clean this to enable incremental build, but in practice we only have a few files so it does not really matter
    'tsc:run',
  ),
)

gulp.task('default', gulp.series('tsc'))

