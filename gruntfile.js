module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    imagemin: {
      build: {
        files: [{
          expand: true,
          cwd: 'img',
          src: '{,*/}*.{png,gif}',
          dest: 'img'
        }]
      }
    },
    sass: {
      dist: {
        files: {
          'css/style.css': 'src/styles/z_site.scss'
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> v<%= pkg.version %> ' + '<%= grunt.template.today("mm.dd.yyyy") %> */'
      },
      my_target: {
        files: {
          'js/script.min.js': ['source/scripts/**/*.js']
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 4 versions']
      },
      your_target: {
        src: 'css/style.css',
        dest: 'css/style.css'
      }
    },
    watch: {
      options: {
        livereload: true
      },
      templates: {
        files: ['**/*.html'],
        tasks: []
      },
      styles: {
        files: ['src/styles/*.scss'],
        tasks: ['sass']
      },
      scripts: {
        files: ['src/scripts/*.js'],
        tasks: ['uglify']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-autoprefixer');

  grunt.registerTask('default', ['imagemin', 'uglify', 'sass', 'autoprefixer']);
};
