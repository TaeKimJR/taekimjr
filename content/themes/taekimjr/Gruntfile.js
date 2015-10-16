module.exports = function(grunt) {
    var LESS_DIR = 'assets/styles/less/';
    var FONTS_DIR = 'assets/fonts/';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            bootstrap: {
                files: [
                    {
                        expand: true,
                        cwd: LESS_DIR + 'libs/bootstrap-3.3.5/fonts/',
                        src: '*',
                        dest: FONTS_DIR}
                ]
            }
        },
        less: {
            app: {
                options: {
                    plugins: [
                        new (require('less-plugin-autoprefix'))({browsers: ['last 2 versions']})
                    ]
                },
                files: {
                    'assets/styles/css/tkjr.css' : LESS_DIR + 'tkjr.less'
                }
            }
        },

        watch: {
            files: [ 'Gruntfile.js', LESS_DIR + '**/*.less' ],
            tasks: [ 'less' ]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['copy', 'less']);
};

