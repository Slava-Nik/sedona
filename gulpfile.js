var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var mqpacker = require("css-mqpacker");
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");


gulp.task("style", function() {
  gulp.src("sass/style.scss")
  	.pipe(plumber())
  	.pipe(sass({outputStyle: "expanded"}))
  	.pipe(postcss([
      autoprefixer({browsers: [
        "last 1 version",
        "last 2 Chrome versions",
        "last 2 Firefox versions",
        "last 2 Opera versions",
        "last 2 Edge versions"
      ]}),
      mqpacker({
      	sort: false
      })
		]))
		.pipe(gulp.dest("css"))
		.pipe(minify())
		.pipe(rename("style.min.css"))
		.pipe(gulp.dest("css"));
});

gulp.task("images", function(){
	 return gulp.src("img/**/*.{jpg, png, gif}")
	 .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true})
    ]))
	.pipe(gulp.dest("img"));


});

gulp.task("watch", ["style"], function(){
	gulp.watch("sass/**/*.scss", ["style"]);
});

gulp.task("default", ["watch"]);
