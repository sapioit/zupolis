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
fi

if [ "$command" == "all" -o "$command" == "libs" -o "$command" == "js" ];
	then
		echo - Compressing libraries
		cat bin/library.filelist | xargs cat >> dist/lib.js
		echo - Compiling libraries
		java -jar bin/yuicompressor-2.4.7.jar dist/lib.js -o dist/lib.min.js -v 2> bin/lib.log
fi

if [ "$command" == "all" -o "$command" == "app" -o "$command" == "js" ];
	then
		echo - Compressing application
		cat bin/app.filelist | xargs cat >> dist/app.js
		echo - Compiling application
		java -jar bin/yuicompressor-2.4.7.jar dist/app.js -o dist/app.min.js -v 2> bin/app.log
fi

echo =============== Done ==================================================