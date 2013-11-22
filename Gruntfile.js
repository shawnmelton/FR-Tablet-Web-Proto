module.exports = (function(grunt) {
    "use strict";

    grunt.initConfig({
        jst: {
            compile: {
                files: {
                    'src/js/templates/jst.js': 'src/js/templates/*/*.html'
                }
            }
        },
        jshint: {
            all: ['Gruntfile.js', 'src/js/*.js', 'src/js/tools/*.js', 'src/js/views/*/*.js']
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: 'src/js/',
                    mainConfigFile: 'src/js/bootstrap.js',
                    name: 'app',
                    include: ['bootstrap'],
                    out: 'dist/js/app.js'
                }
            }
        },
        uglify: {
            options: {
                mangle: true,
                compress: true,
                report: 'min'
            },
            my_target: {
                files: {
                    'dist/js/require.js': ['src/js/libs/require.js']
                }
            }
        },
        sass: {
            dist: {
                files: {
                    'src/tmp/layout.css': 'src/css/layout.scss',
                    'src/tmp/responsive.css': 'src/css/responsive.scss'
                }
            }
        },
        cssmin: {
            compress: {
                files: {
                    'dist/css/styles.css': ['src/css/reset.css', 'src/tmp/*.css']
                }
            }
        },
        imagemin: {
            options: {
                optimizationLevel: 3
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/img/',
                    src: ['*.png', '*.jpg'],
                    dest: 'dist/img/'
                }]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: { 
                    'dist/index.html' : 'src/index.html'
                }
            }
        },
        watch: {
            css: {
                files: ['src/css/*.scss', 'src/css/*.css'],
                tasks: ['sass', 'cssmin'],
                options: {
                    livereload: true
                }
            },
            scripts: {
                files: ['src/js/*.js', 'src/js/**/*.js'],
                tasks: ['jshint', 'requirejs'],
                options: {
                    livereload: true
                }
            },
            images: {
                files: ['src/img/*.png', 'src/img/*.jpg'],
                tasks: ['imagemin'],
                options: {
                    livereload: true
                }
            },
            html: {
                files: ['src/index.html'],
                tasks: ['htmlmin'],
                options: {
                    livereload: true
                }
            },
            templates: {
                files: ['src/js/templates/*/*.html'],
                tasks: ['jst', 'requirejs'],
                options: {
                    livereload: true
                }
            }
        }
    });

    grunt.event.on('watch', function(action, filepath) {
        grunt.log.writeln(filepath +' has '+ action);
    });

    grunt.loadNpmTasks('grunt-contrib-jst');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-imagemin");
    grunt.loadNpmTasks("grunt-contrib-htmlmin");
    grunt.loadNpmTasks("grunt-contrib-watch");

    grunt.registerTask('default', [
        'jst', 'jshint', 'requirejs', 'uglify', 'sass', 'cssmin', 'htmlmin', 'imagemin'//, 'watch'
    ]);
});