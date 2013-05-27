module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
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
    svgo: {
      optimize: {
        files: 'img/*.svg'
      }
    },
    cssmin: {
      add_banner: {
        options: {
          banner: '/*! <%= pkg.name %> v<%= pkg.version %> ' + '<%= grunt.template.today("mm.dd.yyyy") %> */'
        },
        files: {
          'css/style.min.css': ['css/**/*.css']
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> v<%= pkg.version %> ' + '<%= grunt.template.today("mm.dd.yyyy") %> */'
      },
      my_target: {
        files: {
          'js/script.min.js': ['js/**/*.js']
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('svgo-grunt');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['imagemin', 'svgo', 'cssmin', 'uglify']);
};
