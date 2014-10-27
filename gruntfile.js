module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/*!\n' +
        '* <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> (<%= pkg.author.url %>)\n' +
        '* Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n*/\n'
    },
    curl: {
      'src/styles/imports/__normalize.scss': 'https://raw.githubusercontent.com/kristerkari/normalize.scss/master/_normalize.scss',
      // 'js/es5-shim.min.js': 'https://raw.githubusercontent.com/es-shims/es5-shim/master/es5-shim.min.js',
      // 'js/es5-shim.map': 'https://raw.githubusercontent.com/es-shims/es5-shim/master/es5-shim.map',
      // 'partials/Mobile_Detect.php': 'https://raw.githubusercontent.com/serbanghita/Mobile-Detect/master/Mobile_Detect.php',
      '.htaccess': 'https://github.com/h5bp/server-configs-apache/blob/master/dist/.htaccess'
    },
    imagemin: {
      build: {
        files: [{
          expand: true,
          cwd: 'img',
          src: '{,*/}*.{png,gif,jpg,jpeg}',
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
    concat: {
      options: {
        separator: '\n',
        stripBanner: true
      },
      scripts: {
        src: ['src/scripts/*.js'],
        dest: 'js/script.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= meta.banner %>'
      },
      my_target: {
        files: {
          'js/script.min.js': ['js/script.js']
        }
      }
    },
    autoprefixer: {
      your_target: {
        src: 'css/style.css',
        dest: 'css/style.css'
      }
    },
    cssmin: {
      compress: {
        options: {
          banner: '<%= meta.banner %>'
        },
        files: {
          'css/style.min.css': ['css/style.css']
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      templates: {
        files: ['**/*.{html,php}'],
        tasks: []
      },
      styles: {
        files: ['src/styles/*.scss'],
        tasks: ['sass']
      },
      scripts: {
        files: ['src/scripts/*.js'],
        tasks: ['concat']
      }
    }
  });

  grunt.loadNpmTasks('grunt-curl');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', ['sass', 'concat']);
  grunt.registerTask('update', ['curl']);
  grunt.registerTask('build', ['sass', 'autoprefixer', 'cssmin', 'concat', 'uglify', 'imagemin']);
};
