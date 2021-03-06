module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
	
		pkg: grunt.file.readJSON('package.json'),

		connect: {
			server: {
				options: {
					port: 1234,
					base: 'build/'
				}
			},
		},

		sass: {                              // Task
			dist: {                            // Target
				options: {                       // Target options
					style: 'expanded'
				},
				files: [{
					expand: true,
					cwd: 'sass',
					src: ['*.scss'],
					dest: 'assets/css',
					ext: '.css'
				}]
			}
		},

		includereplace: {
			core: {
				options: {
					includesDir: 'source/partials/'
				},
				// Files to perform replacements and includes with 
				src: ['source/*.html'],
				// Destination directory to copy files to 
				dest: 'tmp/'
			}
		},

		clean: {
			build: ["build"],
			tmp: ["tmp"]
		},

		watch: {
			html: {
				files: ['source/**/*.html'],
				tasks: ['clean:build', 'includereplace', 'copy:main', 'clean:tmp']
			},
			css: {
				files: ['sass/**/*.scss'],
				tasks: ['sass']
			}
		},

		copy: {
			main: {
				expand: true,
				cwd: 'tmp/source',
				src: '**/*',
				dest: 'build/',
			},
		}

	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-sass');	
	grunt.loadNpmTasks('grunt-contrib-watch');	
	grunt.loadNpmTasks('grunt-include-replace');

	// Default task(s).
	grunt.registerTask('default', ['connect', 'watch']);
	grunt.registerTask('build', ['clean:build', 'includereplace', 'copy:main', 'clean:tmp']);

};