var gulp = require("gulp");
var path = require("path");
var fs = require("fs");
var plumber = require("gulp-plumber");
var sass = require("gulp-sass");
var sassGlob = require("gulp-sass-glob");

var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var cssnano = require("cssnano");
var pug = require("gulp-pug");
var data = require("gulp-data");
var babelify = require("babelify");
var browserify = require("browserify");
var uglifyify = require("uglifyify");
var source = require("vinyl-source-stream");
var imagemin = require("gulp-imagemin");
var cache = require("gulp-cache");
var del = require("del");

var browserSync = require("browser-sync");

gulp.task("sass", function () {
    const postcssPlugins = [
        autoprefixer({ browsers: ['last 4 version'] }),
        cssnano()
    ];
    return gulp.src("src/sass/main.scss")
        .pipe(plumber())
        .pipe(sassGlob())
        .pipe(sass({outputStyle: "expanded"}))
        .pipe(postcss(postcssPlugins))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task("css", function(){
    return gulp.src("src/css/**/*.css")
        .pipe(gulp.dest("dist/css"));
})

gulp.task("pug", function () {
    return gulp.src(["!src/pug/layout.pug", "src/**/*.pug"])
        .pipe(plumber())
        .pipe(data(function(file){
            return {require, __dirname}
        }))
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest("dist"))
});
gulp.task('pug-watch', ['pug'], browserSync.reload);

gulp.task("javascript", function () {
    var bundler = browserify("src/js/main.js", { cache: {} })
    bundler.transform(babelify, { presets: ["env"] });
    bundler.transform(uglifyify, {global: true});

    return bundler.bundle()
        .pipe(plumber())
        .pipe(source("main.js"))
        .pipe(gulp.dest("dist/js"))
});
gulp.task("javascript-watch", ["javascript"], browserSync.reload)

gulp.task("images", function () {
    return gulp.src("src/img/**/*.+(png|jpg|gif|svg)")
        .pipe(cache(imagemin({ interlaced: true })))
        .pipe(gulp.dest("dist/img"))
});
gulp.task("assets", function () {
    return gulp.src("src/assets/**/*")
        .pipe(gulp.dest("dist/assets"));
});
gulp.task("clean:dist", function () {
    return del.sync("dist");
});
gulp.task('clean:cache', function () {
    cache.clearAll();
});

const allTasks = ["sass", "css", "pug", "images", "assets", "javascript"];

gulp.task("watch", allTasks, function () {
    browserSync({
        server: {
            baseDir: "dist"
        },
    })
    gulp.watch("src/css/**/*.css", ["css"]);    
    gulp.watch("src/sass/**/*.scss", ["sass"]);
    gulp.watch("src/**/*.pug", ["pug-watch"]);
    gulp.watch("src/pug/**/*", ["pug-watch"]);
    gulp.watch("src/js/**/*.js", ["javascript-watch"]);
    gulp.watch("src/img/**/*", ["images"]);
    gulp.watch("src/assets/**/*", ["assets"]);
});

gulp.task("default", allTasks);
