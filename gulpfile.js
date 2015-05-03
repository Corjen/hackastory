var gulp         = require('gulp');
var sass         = require('gulp-sass');
var gutil        = require('gulp-util');
var sourcemaps   = require('gulp-sourcemaps');
var minifyCSS    = require('gulp-minify-css');
var rename       = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var plumber      = require('gulp-plumber');
var watch        = require('gulp-watch');
var browserSync  = require('browser-sync');
var reload       = browserSync.reload;
var notify       = require('gulp-notify');
var uglify       = require('gulp-uglify');
var cheerio      = require('gulp-cheerio');
var svgstore     = require('gulp-svgstore');
var concat       = require('gulp-concat');

/* IP adress */
var ip = 'localhost';

/* Array with vendor dependencies */
var vendor_dependencies = [
];

/* onError */
var onError = function (err) {
  gutil.beep();
  console.log(err.message);
  this.emit('end');
};

/* Sass
   ========================================================================== */
gulp.task('sass', function() {
  return gulp.src('scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(sass())
    .pipe(autoprefixer('last 3 version'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./css'))
    .pipe(notify({message: 'Generated main.css'}))
    .pipe(reload({stream:true}));
});


/* Minify CSS, only fires when sass task is finished */
gulp.task('minify-css', ['sass'], function () {
  return gulp.src('./css/main.css')
    .pipe(minifyCSS())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('./css'));
});

/* SVG
   ========================================================================== */
gulp.task('svg', function() {
  return gulp
    .src('img/icons/*.svg')
    .pipe(cheerio({
      run: function ($) {
        $('[fill]').removeAttr('fill');
      },
      parserOptions: { xmlMode: true }
    }))
    .pipe(svgstore({inlineSvg : true}))
    .pipe(cheerio(function ($) {
      $('svg').attr('style', 'display:none');
    }))
    .pipe(gulp.dest('img'))
    .pipe(reload({stream:false}));
});

/* JS
   ========================================================================== */

 /* Combine .js files from /src and concentate them into main.js */
 gulp.task('build-js', function() {
   return gulp.src('js/src/**.js')
     .pipe(concat('main.js'))
     .pipe(gulp.dest('./js'));
 });

/* Combine and minify vendor.js and main.js into main.min.js. Only fires when build-js is ready */
gulp.task('minify-js', ['build-js'], function(){
  return gulp.src(['./js/vendor.js','./js/main.js'])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./js'));
});

/* Gulpfile
   ========================================================================== */

/* Concentate Vendor depencies into vendor.js */
gulp.task('vendor-js', function() {
  return gulp.src(vendor_dependencies)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./js'));
});

/* Browser sync server
   ========================================================================== */
gulp.task('browser-sync', function() {
    browserSync.init(["css/*.css", "js/*.js"], {
      proxy: ip +'/hackastory/',
      port: 8080,
      browser: "chrome",
      host:  ip
    });
});

/* Reload all browsers
   ========================================================================== */
gulp.task('bs-reload', function () {
  browserSync.reload();
});

/* Default task
   ========================================================================== */
gulp.task('default', ['browser-sync'], function () {
  gulp.watch("scss/**/*.scss", ['sass', 'minify-css']);
  gulp.watch('**/*.html', ['bs-reload']);
  gulp.watch('**/**/*.php', ['bs-reload']);
  gulp.watch('js/src/**.js', ['build-js', 'minify-js']);
  gulp.watch('gulpfile.js', ['vendor-js']);
  gulp.watch('img/icons/*.svg', ['svg']);
});