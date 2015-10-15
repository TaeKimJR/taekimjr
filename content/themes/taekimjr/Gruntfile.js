module.exports = function(grunt) {
    var APP_LESS_DIR = "assets/styles/less/";

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            app: {
                options: {
                    plugins: [
                        new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions"]})
                    ]
                },
                files: {
                    "assets/styles/css/tkjr.css" : APP_LESS_DIR + "tkjr.less"
                }
            }
        },

        watch: {
            files: [ 'Gruntfile.js', APP_LESS_DIR + '**/*.less' ],
            tasks: [ 'less' ]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['less']);
};

