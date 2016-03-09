var gulp = require("gulp");
var minify = require("gulp-minify");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var named = require("vinyl-named");
var through = require('through2');
var webpack = require('webpack-stream');

gulp.task("default", function () {
  return gulp.src(["src/**/*.js"])
    .pipe(named())
    .pipe(webpack({
      devtool: 'source-map'
    }))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(through.obj(function (file, enc, cb) {
      var isSourceMap = /\.map$/.test(file.path);
      if (!isSourceMap) this.push(file);
      cb();
    }))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(minify())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist"));
});
