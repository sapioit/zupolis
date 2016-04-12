#!/bin/bash

if [ $# -eq 0 ];
	then
		echo "Usage: build.sh SECTION (where section can be one of the following: all, clean, libs, app, js, css"
		exit 1
fi

echo =============== Setting up build environment ===============

command="$1"

if [ "$command" == "all" -o "$command" == "clean" ];
	then
		echo - Cleaning up previous builds
		rm -rf dist/*.js
		rm -rf dist/*.css
fi

echo =============== Compressing files ===============

if [ "$command" == "all" -o "$command" == "css" ];
	then
		echo - Compressing stylesheets
		cat bin/css.filelist | xargs cat >> dist/app.css
		echo - Compiling stylesheets
		java -jar bin/yuicompressor-2.4.8.jar dist/app.css -o dist/app.min.css -v 2> bin/css.log
fi

if [ "$command" == "all" -o "$command" == "libs" -o "$command" == "js" ];
	then
		echo - Compressing libraries
		cat bin/library.filelist | xargs cat >> dist/lib.js
		echo - Compiling libraries
		java -jar bin/google-closure-compiler.jar --js=dist/lib.js --js_output_file=dist/lib.min.js 2> bin/lib.log
		# java -jar bin/yuicompressor-2.4.8.jar dist/lib.js -o dist/lib.min.js -v 2> bin/lib.log
fi

if [ "$command" == "all" -o "$command" == "app" -o "$command" == "js" ];
	then
		echo - Compressing application
		cat bin/app.filelist | xargs cat >> dist/app.js
		echo - Compiling application
		java -jar bin/google-closure-compiler.jar --js=dist/app.js --js_output_file=dist/app.min.js 2> bin/app.log
		# java -jar bin/yuicompressor-2.4.8.jar dist/app.js -o dist/app.min.js -v 2> bin/app.log
fi

echo =============== Done ==================================================