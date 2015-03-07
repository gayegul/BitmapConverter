'use strict';

var fs = require('fs');
var bitmap = fs.readFileSync('test.bmp');
var BitmapChanger = require('./lib/bmpChanger.js');


var buf = new Buffer(bitmap);
var changer = new BitmapChanger(buf);
var buf2 = new Buffer(bitmap);
var changer2 = new BitmapChanger(buf2);
var buf3 = new Buffer(bitmap);
var changer3 = new BitmapChanger(buf3);

changer.removeRed();
fs.writeFile('noRed.bmp', changer.toBuffer() );

changer2.removeGreen();
fs.writeFile('noGreen.bmp', changer2.toBuffer() );

changer3.invert();
fs.writeFile('inverted.bmp', changer3.toBuffer() );

