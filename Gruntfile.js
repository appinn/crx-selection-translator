module.exports = function (grunt) {
    'use strict';

    require('time-grunt')(grunt);
    require('load-grunt-config')(grunt, {
        init: true,
        data: {
            pkg  : grunt.file.readJSON('package.json'),
            src  : 'src',  // 源码目录
            dist : 'dist', // 发布目录
            dev  : 'dev',  // 调试目录
            bower: 'bower_components'
        }
    });

};