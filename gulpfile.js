var gulp = require("gulp");
var sass = require("gulp-sass");
var browserSync = require('browser-sync');

gulp.task('sass', function() {
  gulp.src("sass/style.scss")
  	.pipe(sass({outputStyle: "expanded"}))
  	.pipe(gulp.dest("css"))
  	.pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function() { 
    browserSync({ 
        server: { 
            baseDir: './' 
        },
        notify: false 
    });
});

gulp.task("watch", ['browser-sync', "sass"], function(){
	gulp.watch("sass/**/*.scss", ["sass"]);
	gulp.watch('./*.html', browserSync.reload);
	gulp.watch('./js/**/*.js', browserSync.reload);
});

gulp.task("default", ["watch"]);
