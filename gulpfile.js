var gulp = require("gulp");
var gulpVersion = require("./lib/gulp-version");

gulp.task("default", function() {
    return gulp
        .src([ "./package.json", "bower.json" ], { buffer: false })
        .pipe(gulpVersion("./gulp-version.json"))
        .pipe(gulp.dest("./test"));
});
