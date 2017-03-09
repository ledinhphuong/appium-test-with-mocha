import 'babel-polyfill'
import fs from 'fs'
import del from 'del'
import gulp from 'gulp'
import gutil from 'gulp-util'
import uglify from 'gulp-uglify'
import babel from 'gulp-babel'
import _ from 'lodash'

const Paths= {
  // SRC: './src/*.js',
  SRC: './src/session.js',
  BUILD: './build'
}

function pipe(src, ...args) {
  return args.reduce((stream, arg) => {
    return stream.pipe(_.isString(arg) ? gulp.dest(arg) : arg)
  }, gulp.src(src))
}

gulp.task('clean', (cb) => {
  return del(Paths.BUILD)
})

gulp.task('build', ['clean'], (cb) => {
  pipe(
    Paths.SRC,
    babel(),
    uglify(require('./.uglifyjsrc')),
    Paths.BUILD
  )

  return cb()
})
