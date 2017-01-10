var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require('gulp-plumber');


gulp.task('sass', function() {
  gulp.src("sass/style.scss")
  	.pipe(plumber())
  	.pipe(sass({outputStyle: "expanded"}))
  	.pipe(gulp.dest("css"));
});


gulp.task("watch", ["sass"], function(){
	gulp.watch("sass/**/*.scss", ["sass"]);
});

gulp.task("default", ["watch"]);
