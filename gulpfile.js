var gulp = require('gulp')
	, del = require('del')
	, runSequence = require('run-sequence')
	, typescript = require('gulp-typescript')
	, less = require('gulp-less')
	, uglify = require('gulp-uglify')
	// , usemin = require('gulp-usemin')
	, concat = require('gulp-concat')
	;


var jsPath = 'js/**/*.js',
	tsPath = 'typescript/**/*.ts',
	tempPath = 'typescript/**/*.json',
	lessPath = 'css/**/*.less',
	htmlPath = 'html/**/*.html';

//plumberはStream中のエラーが原因でタスクが強制停止することを防止するモジュール
var plumber = require('gulp-plumber'),
	plum = function () {
		return plumber({
			handleError: function (err) {
				console.log(err);
				this.emit('end');
			}
		});
	};

//bower
// var mainBowerFiles  = require('main-bower-files');
// var flatten = require('gulp-flatten');
// var gulpFilter = require('gulp-filter');
// var rename = require('gulp-rename')
// var concat = require('gulp-concat');


//typescript

gulp.task('clean', function () {
	del.sync(['public/**/', 'public/*']);
});
//bower_componentsを結合して１つのjsファイルにする
// gulp.task('bower', function() {
//   var jsFilter = gulpFilter('**/*.js')
//   var cssFilter = gulpFilter('**/*.css')
// 	gulp.src(mainBowerFiles())
//     .pipe(gulp.dest('public'))
// 	 ;
// });

//lessをコンパイルする
gulp.task('less', function () {
	gulp.src([lessPath])
		.pipe(plum())
		.pipe(less())
		.pipe(gulp.dest('public/css'));
});

//htmlを出力先にコピーする
gulp.task('html', function () {
	gulp.src([htmlPath])
		.pipe(plum())
		// .pipe(usemin())
		.pipe(gulp.dest('public'));
});

//typescriptをコンパイルする
gulp.task('typescript', function () {
	del.sync(['public/js/*']);
	// テスト用フルサイズ
	gulp.src([tsPath])
		.pipe(plum())
		.pipe(typescript())
		.pipe(gulp.dest('public/js'));

	// concat.min.js
	gulp.src([tsPath])
		.pipe(plum())
		.pipe(typescript())
		.pipe(concat('codehighlight.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('public/js'));
});

//jsonデータをコピーする
gulp.task('json', function () {
	gulp.src([tempPath])
		.pipe(plum())
		.pipe(gulp.dest('public/js'));
});

//ファイルの更新を監視する
gulp.task('watch', function () {
	gulp.watch(tsPath, ['typescript']);
	gulp.watch(lessPath, ['less']);
	gulp.watch(htmlPath, ['html']);
	gulp.watch(tempPath, ['json']);
});

gulp.task('build', function () {
	runSequence('clean', ['typescript', 'less', 'html', 'json'])
});

// build & watch
gulp.task('debug', ['build', 'watch'], function () { });