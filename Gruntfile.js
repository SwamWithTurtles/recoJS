module.exports = function(grunt) {

    var path = require('path');
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        babel: {
            options: {
                sourceMap: true,
                presets: ['es2015'],
                plugins: ["transform-es2015-modules-umd"]
            },
            dist: {
                files: [
                    {
                        expand: true,    
                        cwd: 'src/',     
                        src: ['**/*.js'],
                        dest: 'dist/',
                        ext: '.js'   
                    },
                    {
                        expand: true,
                        cwd: 'public/javascripts',
                        src: ['**/*.js'],
                        dest: 'dist/public/javascripts',
                        ext: '.js'
                    }
                ]
            }
        },
        express: {
            web: {
                options: {
                    script: 'dist/app.js'
                }
            }

        },
        watch: {
            options: {
                livereload: true
            },
            scripts: {
                files: ['public/**/*.js', 'public/**.*.hjs', 'public/**.*.sass', 'src/**/*.js'],
                tasks: ['default'],
                options: {
                    spawn: false
                }
            }
        }
    });

    grunt.registerTask('default', ['babel', 'express:web', 'watch:scripts']);
};
