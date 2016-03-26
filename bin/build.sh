#!/bin/sh

rm -rf dist/*

echo - Concatenating

cat bin/css.filelist | xargs cat >> dist/app.css

cat bin/library.filelist | xargs cat >> dist/lib.js

cat bin/app.filelist | xargs cat >> dist/app.js

echo - Compressing

java -jar bin/yuicompressor-2.4.7.jar dist/app.js -o dist/app.min.js -v 2> bin/app.log

rm -rf dist/app.js