var gulp = require("gulp");
var path = require("path");
var gulpVersion = require("./lib/gulp-version");

gulp.task("default", function() {
    return gulp
        .src([ "./package.json", "bower.json" ], { buffer: false })
        .pipe(gulpVersion(path.join(__dirname, "/gulp-version.json")))
        .pipe(gulp.dest("./test"));
});
