module.exports = (function(grunt) {
    'use strict';

    grunt.initConfig({
        jst: {
            compile: {
                files: {
                    'src/js/templates/jst.js': 'src/js/templates/**/*.html',
                }
            }
        },
        jshint: {
            all: ['Gruntfile.js', 'src/js/*.js', 'src/js/tools/*.js', 'src/js/views/*/*.js']
        },
        requirejs: {
            compile: {
                options: {
                    optimize: 'uglify',
                    preserveLicenseComments: false,
                    findNestedDependencies: true,
                    baseUrl: 'src/js/',
                    mainConfigFile: 'src/js/bootstrap.js',
                    name: 'app',
                    include: ['bootstrap'],
                    out: 'tmp/js/app.js'
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
                    'dist/js/app.js': ['src/js/libs/require.js', 'tmp/js/app.js']
                }
            }
        },
        sass: {
            dist: {
                files: {
                    'dist/css/styles.css': 'src/css/styles.scss'
                },
                options: {
                    style: 'compressed'
                }
            }
        },
        imagemin: {
            options: {
                optimizationLevel: 3
            },
            sitesImages: {
                files: [{
                    expand: true,
                    cwd: 'src/img/',
                    src: ['*.png', '*.jpg', '*.gif', '*/*.jpg'],
                    dest: 'dist/img/'
                }]
            }
        },
        imageEmbed: {
            dist: {
                src: ['dist/css/styles.css'],
                dest: 'dist/css/styles.css',
                options: {
                    deleteAfterEncoding : false
                }
            }
        },
        embed: {
            custom_options: {
                options: {
                    threshold: '500KB'
                },
                files: {
                    'dist/index.html': 'dist/index.html'
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: { 
                    'dist/index.html': 'src/index.html'
                }
            }
        },
        clean: ['tmp', 'dist/img', 'dist/js', 'dist/css', 'dist/index.html'],
        watch: {
            css: {
                files: ['src/css/*.scss'],
                tasks: ['sass'],
                options: {
                    livereload: true
                }
            },
            scripts: {
                files: ['src/js/*.js', 'src/js/**/*.js'],
                tasks: ['jshint', 'requirejs', 'uglify'],
                options: {
                    livereload: true
                }
            },
            images: {
                files: ['src/img/*.png', 'src/img/*.jpg', 'src/img/*.gif'],
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
        },
        'ftp-deploy': {
          build: {
            auth: {
              host: 'tantopic.com',
              port: 21,
              authKey: 'key1'
            },
            src: '/Users/danielburke/Documents/Development/DE/Sites/Forrent/FR-Tablet-Web-Proto/dist',
            dest: 'domains/tantopic.com/html/',
            exclusions: ['/Users/danielburke/Documents/Development/DE/Sites/Forrent/FR-Tablet-Web-Proto/dist/**/.DS_Store',
            '/Users/danielburke/Documents/Development/DE/Sites/Forrent/FR-Tablet-Web-Proto/dist/**/.htaccess',
            '/Users/danielburke/Documents/Development/DE/Sites/Forrent/FR-Tablet-Web-Proto/dist/js',
            '/Users/danielburke/Documents/Development/DE/Sites/Forrent/FR-Tablet-Web-Proto/dist/css',
            '/Users/danielburke/Documents/Development/DE/Sites/Forrent/FR-Tablet-Web-Proto/dist/img',
            '/Users/danielburke/Documents/Development/DE/Sites/Forrent/FR-Tablet-Web-Proto/dist/api.php']
          }
        }
    });

    grunt.event.on('watch', function(action, filepath) {
        grunt.log.writeln(filepath +' has '+ action);
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jst');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-embed');
    grunt.loadNpmTasks('grunt-image-embed');
    grunt.loadNpmTasks('grunt-ftp-deploy');

    grunt.registerTask('default', [
        'jst', 'jshint', 'requirejs', 'uglify', 'sass', 'imagemin', 'imageEmbed', 'htmlmin', 'embed', 'ftp-deploy'
    ]);

    grunt.registerTask('cleanup', ['clean']);
});