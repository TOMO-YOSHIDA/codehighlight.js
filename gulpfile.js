var gulp = require('gulp')
	, del = require('del')
	, runSequence = require('run-sequence')
	, typescript = require('gulp-typescript')
	, tsconfig = require('gulp-tsconfig-update')
	, less = require('gulp-less')
	, uglify = require('gulp-uglify')
	, concat = require('gulp-concat')
	, minifycss = require('gulp-minify-css')
	;


var tsPath = 'typescript/**/*.ts',
	lessPath = 'css/**/*.less';

var tsSetting = {
	target: "ES5",
	sortOutput: true
}

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

// 出力フォルダのクリーンアップ
gulp.task('clean', function () {
	del.sync(['public/**/']);
});

//lessをコンパイルする
gulp.task('less', function () {
	gulp.src(lessPath)
		.pipe(plum())
		.pipe(less())
		.pipe(gulp.dest('public/css'))
		.pipe(concat('codehighlight.min.css'))
		.pipe(minifycss())
		.pipe(gulp.dest('dist'))
		.pipe(gulp.dest('public/dist'));
});

//htmlを出力先にコピーする
gulp.task('html', function () {
	gulp.src('test/**/*.html')
		.pipe(gulp.dest('public'));
});

//typescriptをコンパイルする
gulp.task('typescript', function () {
	// no compress
	gulp.src(tsPath)
		.pipe(tsconfig())
		.pipe(plum())
		.pipe(typescript(tsSetting))
		.pipe(gulp.dest('public/js'))
		.pipe(concat('codehighlight.all.js'))
		.pipe(gulp.dest('public/js'))
		.pipe(concat('codehighlight.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist'))
		.pipe(gulp.dest('public/dist'));


	// ついでにjavascriptのリリースも
	gulp.src('test/**/*.ts')
		.pipe(plum())
		.pipe(typescript(tsSetting))
		.pipe(uglify())
		.pipe(gulp.dest('public'));
});

//ファイルの更新を監視する
gulp.task('watch', function () {
	gulp.watch('**/*.ts', ['typescript']);
	gulp.watch('**/*.less', ['less']);
	gulp.watch('test/**/*.html', ['html']);
});

gulp.task('build', function () {
	runSequence('clean', ['typescript', 'less', 'html'])
});

// build & watch
gulp.task('debug', ['build', 'watch'], function () { });