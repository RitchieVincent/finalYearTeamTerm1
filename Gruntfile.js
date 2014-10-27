'use strict';

module.exports = function(grunt) {

    grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		project: {
		    app: ['app'],
		    assets: ['<%= project.app %>/assets'],
		    css: ['<%= project.assets %>/sass/style.scss'],
		    js: ['<%= project.assets %>/js']
		},

		sass: {
		    dev: {
		        options: {
		            style: 'expanded',
		            compass: false
		        },
		        files: {
		            '<%= project.assets %>/css/style.css':'<%= project.css %>'
		        }
		    }
		},

		jshint: {
	      options: {
	        reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
	      },

	      build: ['Grunfile.js', '<%= project.js %>/script.js']
	    },

	    // configure uglify to minify js files -------------------------------------
	    uglify: {
	      options: {
	        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
	      },
	      build: {
	        files: {
	          '<%= project.js %>/script.min.js': ['<%= project.js %>/script.js', 'app/bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js']
	        }
	      }
	    },

	    // configure cssmin to minify css files ------------------------------------
	    cssmin: {
	      options: {
	        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
	      },
	      build: {
	        files: {
	          '<%= project.assets %>/css/style.min.css': '<%= project.assets %>/css/style.css'
	        }
	      }
	    },

		watch: {
		    sass: {
		        files: '<%= project.assets %>/sass/{,*/}*.{scss,sass}',
		        tasks: ['sass:dev']
		    }
		}

    });

    grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', [
	    'jshint',
	    'uglify',
	    'cssmin',
	    'watch' 
	]);

};