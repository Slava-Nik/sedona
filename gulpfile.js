var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var mqpacker = require("css-mqpacker");
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var svgmin = require("gulp-svgmin");
var svgstore = require("gulp-svgstore");
var run = require("run-sequence");
var del = require("del");


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
	.pipe(gulp.dest("build/img"));
});


gulp.task("symbols", function(){
	return gulp.src("img/icons/*.svg")
	.pipe(svgmin())
	.pipe(svgstore({
    inlineSvg: true
  }))
  .pipe(rename("symbols.svg"))
  .pipe(gulp.dest("img"));
});

gulp.task("clean", function(){
  return del("build");
});

gulp.task("copy",function(){
  return gulp.src([
    "fonts/**/*.{woff,woff2}",
    "img/**",
    "css/**",
    "js/**",
    "*.html"
    ], {
        base: "."
    })

  .pipe(gulp.dest("build"));
});


gulp.task("build", function(callback){
  run(
   "clean",
   "style", 
   "symbols",
   "copy",
   "images",
    callback
  );
});



gulp.task("watch", ["style"], function(){
	gulp.watch("sass/**/*.scss", ["style"]);
});

gulp.task("default", ["watch"]);
