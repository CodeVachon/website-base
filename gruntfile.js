module.exports = function(grunt) {
	// Project configuration.
	var _banner = '/** \n* Package: <%= pkg.name %> \n* Author: <%= pkg.developer %> \n* Build Time: <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %>  \n*/\n';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			options: {
				globals: {
					jQuery: true,
					console: true,
					module: true
				} // close .globals
			}, // close .options
			file: {
				src: ['gruntfile.js'],
			}, // close .file
			build: {
				src: ['src/js/*.js'],
			} // close .build
		}, // close jshint
		uglify: {
			options: {
				banner: _banner,
				mangle: {
					except: ['jQuery', 'Backbone']
				}
			}, // close .options
			file: {
				files: [{'gruntfile.min.js': ['gruntfile.js']}]
			}, // close .file
			build: {
				files: [{
					cwd: 'src/js',
					expand: true,
					src: ['*.js'],
					dest: 'includes/js/',
					ext: '.min.js'
				}]
			}, // close .build
		}, // close uglify
		csslint: {
			options: {
				"import": 2,
				"important": false,
				"ids": false,
				"adjoining-classes": false,
				"qualified-headings": false,
				"overqualified-elements": false,
				"unique-headings": false,
				"duplicate-background-images": false
			}, // close .options
			file: {
				src: ['src/css/main.css']
			}, // close .file
			build: {
				src: ['src/css/*.css']
			} // close .build
		}, // close csslint
		cssmin: {
			options: {
				banner: _banner,
			}, // close .options
			file: {
				files: {'src/css/main.min.css': ['src/css/main.css']}
			}, // close .file
			build: {
				files: [{
					cwd: 'src/css',
					expand: true,
					src: ['*.css'],
					dest: 'includes/css/',
					ext: '.min.css'
				}]
			}, // close .build
		}, // close cssmin
		less: {
			file: {
				files: {'src/css/main.min.css': ['src/css/main.css']}
			}, // close .file
			build: {
				files: [{
					cwd: 'src/less',
					expand: true,
					src: ['*.less'],
					dest: 'src/css/',
					ext: '.css'
				}]
			}, // close .build
		}, // close less
		watch: {
			gruntFile: {
				files: ['gruntfile.js'],
				tasks: ['jshint:file']
			}, // close .gruntFile
			jsCompile: {
				files: ['src/js/*.js','!src/js/*.min.js'],
				tasks: ['jshint:file','uglify:file'],
				options: {
					spawn: false,
					nospawn: true
				} // close .options
			}, // close .jsCompile
			cssCompile: {
				files: ['src/css/*.css','!src/css/*.min.css'],
				tasks: ['csslint:file','cssmin:file'],
				options: {
					spawn: false,
					nospawn: true
				} // close .options
			}, // close .cssCompile
			lessCompile: {
				files: ['src/less/*.less'],
				tasks: ['less:file','csslint:file','cssmin:file'],
				options: {
					spawn: false,
					nospawn: true
				} // close .options
			} // close .lessCompile
		} // close watch
	}); // close grunt.initConfig

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-less');

	// Default task.
	grunt.registerTask('default', function() {
		grunt.log.write('\nPlease Specify a Function\neg: ');
		grunt.log.ok('grunt watch');
		grunt.log.subhead('watch');
		grunt.log.writeln('Sets the Watch Event to start watching LESS, CSS, and JS');
		grunt.log.writeln('files in the SRC Folder');
		grunt.log.subhead('checkJS');
		grunt.log.writeln('Runs jsHint on all JS files in the SRC Folder');
		grunt.log.subhead('buildJS');
		grunt.log.writeln('Lints and Minifies all JS files in the SRC folder.');
		grunt.log.writeln('Moves them to the INCLUDES Folder');
		grunt.log.subhead('checkCSS');
		grunt.log.writeln('Runs Lint on all CSS files in the SRC Folder');
		grunt.log.subhead('buildCSS');
		grunt.log.writeln('Lints and Minifies all CSS files in the SRC folder.');
		grunt.log.writeln('Moves them to the INCLUDES Folder');
		grunt.log.subhead('compileLess');
		grunt.log.writeln('Compiles, Lints all LESS files in the SRC');
		grunt.log.subhead('buildLess');
		grunt.log.writeln('Compiles, Lints and Minifies all LESS files in the SRC');
		grunt.log.writeln('folder.  Moves the Resulting CSS Files to the INCLUDES Folder');
	});
	grunt.registerTask('buildJS', ['jshint:build','uglify:build']);
	grunt.registerTask('checkJS', ['jshint:build']);
	grunt.registerTask('buildCSS', ['csslint:build','cssmin:build']);
	grunt.registerTask('checkCSS', ['csslint:build']);
	grunt.registerTask('compileLess', ['less:build','csslint:build']);
	grunt.registerTask('buildLess', ['less:build','csslint:build','cssmin:build']);

	grunt.event.on("watch", function(action, filepath, target) {
		var srcFolder = "src\\";
		var destFolder = "includes\\";
		grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
		if (target == 'jsCompile') {
			grunt.config('jshint.file.src', filepath);
			grunt.config(['uglify', 'file', 'src'], filepath);
			grunt.config(['uglify', 'file', 'dest'], filepath.replace(srcFolder,destFolder).replace(/(\.js)$/gi,'.min.js'));
		} else if (target == 'cssCompile') {
			grunt.config('csslint.file.src', filepath);
			grunt.config(['cssmin', 'file', 'src'], filepath);
			grunt.config(['cssmin', 'file', 'dest'], filepath.replace(srcFolder,destFolder).replace(/(\.css)$/gi,'.min.css'));
		} else if (target == 'lessCompile') {
			var cssFileName = filepath.replace("\\less\\","\\css\\").replace(/(\.less)$/gi,'.css');
			grunt.log.writeln('CSS File:' + cssFileName);
			grunt.config(['less', 'file', 'src'], filepath);
			grunt.config(['less', 'file', 'dest'], cssFileName);
			grunt.config('csslint.file.src', cssFileName);
			grunt.config(['cssmin', 'file', 'src'], cssFileName);
			grunt.config(['cssmin', 'file', 'dest'], cssFileName.replace(srcFolder,destFolder).replace(/(\.css)$/gi,'.min.css'));
		} // close if target...
	}); // close grunt.event.on("watch")
}; // close module.exports
