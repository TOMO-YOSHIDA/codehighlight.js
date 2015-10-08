var gulp = require('gulp')
	, del = require('del')
	, runSequence = require('run-sequence')
	, typescript = require('gulp-typescript')
	, less = require('gulp-less')
	, uglify = require('gulp-uglify')
	, concat = require('gulp-concat')
	, markdown = require('gulp-markdown')
	;


var jsPath = 'javascript/**/*.ts',
	tsPath = 'typescript/**/*.ts',
	lessPath = 'css/**/*.less',
	htmlPath = 'html/**/*.html',
	mdPath = '**/*.md';

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
	del.sync(['public/**/', 'public/*']);
});

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
		.pipe(gulp.dest('public'));
});

//typescriptをコンパイルする
gulp.task('typescript', function () {
	del.sync(['public/js/*', 'public/javascript/*']);
	// テスト用フルサイズ
	gulp.src([tsPath])
		.pipe(plum())
		.pipe(typescript())
		.pipe(gulp.dest('public/javascript'))
		.pipe(concat('codehighlight.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('public/js'));

	// ついでにjavascriptのリリースも
	gulp.src([jsPath])
		.pipe(plum())
		.pipe(typescript())
		.pipe(uglify())
		.pipe(gulp.dest('public/javascript'));
});

gulp.task('markdown', function () {
	gulp.src(mdPath)
		.pipe(plum())
		.pipe(markdown())
		.pipe(gulp.dest('public/'));
});

//ファイルの更新を監視する
gulp.task('watch', function () {
	gulp.watch(tsPath, ['typescript']);
	gulp.watch(jsPath, ['typescript']);
	gulp.watch(lessPath, ['less']);
	gulp.watch(htmlPath, ['html']);
	// gulp.watch(mdPath, ['markdown']);
});

gulp.task('build', function () {
	runSequence('clean', ['typescript', 'less', 'html', 'markdown'])
});

// build & watch
gulp.task('debug', ['build', 'watch'], function () { });