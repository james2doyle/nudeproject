module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ["js/script.min.js", "css/style.min.css"],
    imagemin: {
      build: {
        files: [{
          expand: true,
          cwd: 'img',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: 'img'
        }]
      }
    },
    svgmin: {
      options: {
        plugins: [{
          removeViewBox: false
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'img',
          src: '*.svg',
          dest: 'img'
        }]
      }
    },
    cssmin: {
      add_banner: {
        options: {
          banner: '/*! <%= pkg.name %> v<%= pkg.version %> ' + '<%= grunt.template.today("mm.dd.yyyy") %> */'
        },
        files: {
          'css/style.min.css': ['css/**/*.css', '!style.min.css']
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> v<%= pkg.version %> ' + '<%= grunt.template.today("mm.dd.yyyy") %> */'
      },
      my_target: {
        files: {
          'js/script.min.js': ['js/**/*.js', '!script.min.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['clean', 'imagemin', 'svgmin', 'cssmin', 'uglify']);
};
