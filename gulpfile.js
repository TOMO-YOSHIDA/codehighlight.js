var gulp = require('gulp')
	, del = require('del')
	, runSequence = require('run-sequence')
	, typescript = require('gulp-typescript')
	, tsconfig = require('gulp-tsconfig-update')
	, less = require('gulp-less')
	, uglify = require('gulp-uglify')
	, concat = require('gulp-concat')
	, autoprefix = require('gulp-autoprefixer')
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
		.pipe(autoprefix())
		.pipe(gulp.dest('public'))
		.pipe(concat('codehighlight.min.css'))
		.pipe(minifycss())
		.pipe(gulp.dest('dist'))
});

//htmlを出力先にコピーする
gulp.task('html', function () {
	gulp.src('test/**')
		.pipe(gulp.dest('public'));
});

//typescriptをコンパイルする
gulp.task('typescript', function () {
	gulp.src(tsPath)
		.pipe(tsconfig())
		.pipe(plum())
		.pipe(typescript(tsSetting))
		.pipe(gulp.dest('public/js'))
		.pipe(concat('public'))
		.pipe(gulp.dest('public'))
		.pipe(concat('codehighlight.min.js'))
		.pipe(gulp.dest('public/concat'))
		.pipe(uglify())
		.pipe(gulp.dest('dist'))
});

//ファイルの更新を監視する
gulp.task('watch', function () {
	gulp.watch(tsPath, ['typescript']);
	gulp.watch(lessPath, ['less']);
});

gulp.task('build', function () {
	runSequence('clean', ['typescript', 'less'])
});

// build & watch
gulp.task('debug', ['build', 'watch'], function () { });