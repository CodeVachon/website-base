Website-Base
=====

This is my Base Website Setup


Grunt
-----
Uses Grunt 0.4.1

grunt
- lists out tasks

grunt watch 
- starts watch task handle files changes in the src folder

grunt checkJS
- run JShint on all JS files in the src folder

grunt buildJS
- run JShint and uglify on all JS files in the src folder, moves minified files to includes folder

grunt checkCSS
- run cssLint on all CSS files in the src folder

grunt buildCSS
- run cssLint and cssMin on all CSS files in the src folder, moves minified files to includes folder

grunt compileLess
- run less on LESS files in the src folder and run cssLint on the compiled files

grunt buildLess
- run less on all LESS files in the src folder, run cssLint on CSS files, and minify css files placing them in the inclides folder
