var gulp=require("gulp");
var minifyjs=require("gulp-uglify");
var minifycss=require("gulp-clean-css");
var connect=require("gulp-connect");
var concat=require("gulp-concat");
var sass=require("gulp-ruby-sass");
var minifyhtml=require("gulp-minify-html");
//变量先声明进来，在做最后调整之前先不压缩，只做refresh的监听


gulp.task('sass',function(){
	return sass('src/scss/*.scss',{style:'compact'}).pipe(gulp.dest('dist/css'));
	
});
gulp.task('connect',['sass'],function(){
	
	return gulp.src('html/HomePage.html').pipe(connect.reload());
});
gulp.task('refresh',function(){
	connect.server({livereload:true});
	
	gulp.watch('src/scss/*.scss',['connect']);/*为了保证先去编译scss文件而不是先刷新页面，这里的传参只传一个
		当传参传两个task的时候不能确定线程的优先级，不能确定那个task先执行，所以在为了保证sass先于connect执行，
		在task-connect中将task-sass作为参数传入来保证sass先执行，connect后执行
	*/
	gulp.watch('html/*.html',['connect']);
	
	
});
