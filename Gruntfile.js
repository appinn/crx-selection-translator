module.exports = function (grunt) {
    'use strict';

    require('time-grunt')(grunt);
    require('load-grunt-config')(grunt, {
        init: true,
        data: {
            pkg: grunt.file.readJSON('package.json'),
            src: 'src',             // 源码目录
            dist: 'dist',           // 发布目录
            dev: 'dev',             // 开发目录
            host: '127.0.0.1',
            port: 6060,
            livereload: 35733
        }
    });

};