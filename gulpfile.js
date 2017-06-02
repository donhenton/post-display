/**
 * 
 * @type Module gulp|Module gulp
 * 
 * 
 * gulp dev --production
 * gulp release --production
 * will contingently minify js, no flag leaves js assembled.
 * 
 */

var notify= function (error) {
                var message = 'In: ';
                var title = 'Error: ';
                if (error.description) {
                    title += error.description;
                } else if (error.message) {
                    title += error.message;
                }

                if (error.filename) {
                    var file = error.filename.split('/');
                    message += file[file.length - 1];
                }

                if (error.lineNumber) {
                    message += '\nOn Line: ' + error.lineNumber;
                }
                console.log(error);
            }



var props = {};
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var uglifycss = require('gulp-uglifycss');
var del = require('del');
var babelify = require('babelify');
var browserify = require('browserify');
var watch = require('gulp-watch');
var tap = require('gulp-tap');
var gutil = require('gulp-util');
var server = require('gulp-server-livereload');
var livereload = require('gulp-livereload');
var gulpsync = require('gulp-sync')(gulp);
var gulpif = require("gulp-if");
var argv = require('yargs').argv;
var rename = require("gulp-rename");
 
var gulp = require('gulp');


var SASS_FILES = './src/sass/**/*.scss';
var JS_FILES = './src/**/*.js';
var MAIN_HTML_FILE = './src/html/index.html';
props.targetLocation = "./public_html";
props.pageURL = "http://localhost:8080";


gulp.task('serve', function (done) {
    livereload.listen();
    gulp.src(props.targetLocation)
            .pipe(server({
                livereload: {
                    enable: true
                },
                host: '127.0.0.1',
                port: 8080,
                defaultFile: 'index.html',
                directoryListing: false,
                open: true
            }));
});

 


gulp.task('copy-html', function () {


    // base allows to copy the folders above the file
    // return gulp.src(MAIN_HTML_FILE,{'cwd': './src/html','base':'./..'} )
    return gulp.src(MAIN_HTML_FILE).pipe(gulp.dest(props.targetLocation))
            .on('finish', function ( ) {
                gutil.log("processing change in html");
                livereload.reload(props.pageURL);
               // cb();
            });
 

});

gulp.task('copy-js', function () {


    // base allows to copy the folders above the file
    // return gulp.src(MAIN_HTML_FILE,{'cwd': './src/html','base':'./..'} )
    return gulp.src(JS_FILES).pipe(gulp.dest(props.targetLocation+"/build"))
            .on('finish', function ( ) {
                gutil.log("processing change in js");
                livereload.reload(props.pageURL);
               // cb();
            });
 

});


var sassProcess =
        function () {

            return gulp.src('src/sass/mainStyles.scss')
                    .pipe(sass().on('error', sass.logError))
                    .pipe(concat('main.css'))
                  //  .pipe(uglifycss())
                    .pipe(gulp.dest(props.targetLocation+"/build/css"));
        };

gulp.task('sass', function () {
    sassProcess();

});
 

gulp.task('watch-general', function () {

    watch(SASS_FILES, function (events, done) {

        sassProcess()
                .on('finish', function ( ) {
                    gutil.log("processing change in css");
                    livereload.reload(props.pageURL);
                });

    });

    watch([JS_FILES], function (events, done) {
        gutil.log("starting js change");
        gulp.start('copy-js');
    });
 
    watch([MAIN_HTML_FILE], function (events, done) {
        gutil.log("starting html change");
        gulp.start('copy-html');
    });
    

});



gulp.task('clean', function (  ) {

    del([props.targetLocation+"/build"]);
    del([props.targetLocation+"/index.html"]);

});

 

gulp.task('dev', gulpsync.sync(['sass', 'copy-html','copy-js','watch-general',   'serve']));