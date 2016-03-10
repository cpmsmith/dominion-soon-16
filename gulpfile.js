var gulp         = require('gulp'),
    rename       = require('gulp-rename'),
    browserSync  = require('browser-sync').create(),
    postcss      = require('gulp-postcss'),
    sourcemaps   = require('gulp-sourcemaps'),
    autoprefixer = require('autoprefixer'),
    precss       = require('precss'),
    nano         = require('gulp-cssnano'),
    imagemin     = require('gulp-imagemin')
    pngcrush     = require('imagemin-pngcrush'),
    changed      = require('gulp-changed');


/**
 * Static server; autoprocesses SCSS files, automatically
 * updates CSS when it changes, and reloads when HTML does.
 */
gulp.task('serve',['postcss'], function() {
  browserSync.init({
    server: './'
    });

  gulp.watch('assets/postcss/**/*.{scss,css}', ['postcss']);
  gulp.watch('*.html').on('change', browserSync.reload);
});

/**
 * Pngcrushes PNG images in assets/img.
 */
gulp.task('crush', function() {
  return gulp.src('./assets/img/src/**/*.{png,gif,jpg}')
    .pipe(changed('./assets/img/src/**/*.{png,gif,jpg}'))
    .pipe(imagemin({
      optimizationLevel: 7,
      progressive: true,
      use: [pngcrush()]
    }))
    .pipe(gulp.dest('./assets/img/'));
})

/**
 * Makes CSS from pseudo-SASS, adds appropriate vendor
 * prefixes, writes maps, spits out to assets/css.
 */
gulp.task('postcss', function () {
  return gulp.src('./assets/postcss/*.scss')
  .pipe(postcss([ 
    precss(),
    autoprefixer({ browsers: ['last 2 versions', 'ie 9', 'ie 10', 'ie 8'] })
  ]))
  .pipe(nano({autoprefixer: false}))
  .pipe(rename({extname:'.css'}))
  .pipe(gulp.dest('./assets/css/'))
  .pipe(browserSync.stream());
});

gulp.task('default',['serve']);