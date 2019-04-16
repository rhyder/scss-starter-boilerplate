'use strict';

import concat from 'gulp-concat';
import del from 'del';
import gulp from 'gulp';

import sass from 'gulp-sass';
import header from 'gulp-header';
import pkg from './package.json';
import browserSync from 'browser-sync';

const server = browserSync.create();

const comment = `/**
 * My css framework v${pkg.version}
 * Copyright 2019 Samuel Ridings
 * www.samridings.com
 */\r\n`;

 const filePaths = {
    scss: {
        src: 'src/index.scss',
        components: 'src/components/*.scss',
        config: 'src/config/*.scss',
        mixins: 'src/mixins/*.scss'
    },
    out: {
        dist: './dist'
    }
};

function reload(done) {
    server.reload();
    done();
};

function serve(done) {
    server.init({
        server: {
            baseDir: './'
        }
    });
    done();
};

const clean = () => del(['dist']);

function styles() {
    return gulp.src(filePaths.scss.src)
        .pipe(concat('myframework.scss'))
        .pipe(header(comment + "\r\n"))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(filePaths.out.dist))
};

const watch = () => gulp.watch([
    filePaths.scss.src,
    filePaths.scss.components,
    filePaths.scss.config,
    filePaths.scss.mixins
], gulp.series(styles, reload));

const dev = gulp.series(clean, styles, serve, watch);
export default dev;