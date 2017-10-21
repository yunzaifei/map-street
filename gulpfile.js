var gulp = require('gulp');
var del = require('del');
var opn = require('opn');
var rename = require('gulp-rename');
var connect = require('gulp-connect');

gulp.task('build', function(){
    del(['dist/!(.git)']).then(moveFile)
})

gulp.task('file', function(){
    moveFile();
    return null;
})

function moveFile(){    
    gulp.src('node_modules/knockout/build/output/knockout-latest.js')
        .pipe(rename('knockout.js'))
        .pipe(gulp.dest('dist/js/lib'));
    gulp.src('node_modules/axios/dist/axios.min.js')
        .pipe(rename('axios.js'))
        .pipe(gulp.dest('dist/js/lib'));
    gulp.src('src/**')
        .pipe(gulp.dest('dist'));
}

gulp.task('server', ['file'], function(){
    connect.server({
        root: 'dist',
        port: 8000,
        livereload: true
    })
    opn('http://127.0.0.1:8000');
})

gulp.task('watch', function(){
    gulp.watch(['src/**'], ['reload']);
})

gulp.task('reload', ['file'], function(){
    console.log('----------------reload server %s---------------------', new Date());
    gulp.src('dist/**').pipe(connect.reload());
})

gulp.task('show', ['server', 'watch'])