module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		/**
		 * Give hints on fixing bugs in JavaScript.
		 */
		jshint: {
			Gruntfile: ['Gruntfile.js'],
			//scripts: ['js/src/*.js']
		},
		
		/**
		 * Process Sass into CSS.
		 */
		sass: {
			build: {  // process specific files
				options: {
					sourcemap: 'auto',
					style: 'compressed',
				},
				files: [
					{'css/styles.css': 'scss/styles.scss'},
					// 'destination': 'source'
					/*{'css/dist/print.css': 'css/src/print.scss'},
					{                               // process this whole folder
						expand: true,
						cwd: 'css/src/custom-css',  // source folder
						src: ['*.scss'],
						dest: 'css/dist/custom-css',  // destination folder
						ext: '.css'
					},*/
				]
			},
			dev: {  // process specific files
				options: {
					lineNumbers: true,
					style: 'expanded',
					sourcemap: 'none'
				},
				files: [
					{'css/styles-dev.css': 'scss/styles.scss'},  // 'destination': 'source'
					//{'css/build/print.css': 'css/src/print.scss'},
					/*{                               // process this whole folder
						expand: true,
						cwd: 'custom-css/',
						src: ['*.scss'],
						dest: 'custom-css/',
						ext: '.css'
					}*/
				]
			},
		},
		
		/**
		 * Sasslint
		 *
		 * Tests Sass to make sure it's written in a standardized way.
		 * Configuration of these tests is located in a hidden file, documented
		 * in an option below.
		 */
		sasslint: {
			options: {
				configFile: 'scss/config/.sass-lint.yml',
				formatter: 'html',
				outputFile: 'scss/config/report.html',
			},
			target: ['scss/*.scss', 'css/smacss/**/*.scss', 'css/custom-css/**/*.scss'],
    },
    
    /**
     * Compress JS by removing whitespace. Different from
     * minification in that it doesn't replace variable and
     * function names, which is easier to debug.
     */
		/*uglify: {
			scripts_to_dist: {
				src: 'js/build/scripts-dev.js',
				dest: 'js/dist/scripts.min.js'
			},
		},*/

		/**
		 * Watch directories and execute Grunt tasks when they change.
		 */
		watch: {
			gruntfile: {  // Validate Gruntfile.
				files: 'Gruntfile.js',
				tasks: ['jshint'],
			},
			/*tools: {  // Copy latest version of _tools to Banner theme
				files: '_tools.scss',
				tasks: ['copy:to_banner_themes']
			},*/
			css: {  // Process Sass into CSS.
				files: ['scss/**/*.scss',],
				//files: ['css/src/style.scss', 'css/src/print.scss', 'css/src/smacss/**/*.scss', 'css/src/custom-css/*.scss'],
				tasks: ['sass', 'sasslint'],
			},
			//js: {  // Concatenate and uglify JavaScript.
				//files: ['js/src/**/*.js'],
				//tasks: ['jshint', 'uglify',],
			//},
		},
    
	});

	// Load the plugins (alphabetical order).
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-sass-lint');

	// Default task(s) (in the order you want to run them).
	grunt.registerTask('default', ['sass', 'sasslint']);
	grunt.registerTask('scripts', ['jshint']);

};