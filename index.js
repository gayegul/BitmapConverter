// Bitmap Transformer
// Code Fellows JavaScript Development Accelerator
// Due 2-9-15
// ---------------------------
// Gaye Bulut
// Tricia Buckenberger
//  Sam Hamm
// ---------------------------

'use strict';

var fs = require('fs');
var bitmap = fs.readFileSync('test2.bmp');

var bitmapObject = {};

bitmapObject.type = bitmap.toString('utf-8', 0, 2); // reads type
bitmapObject.size = bitmap.readUInt32LE(2); // reads size
bitmapObject.startOfPixels = bitmap.readUInt32LE(10);
bitmapObject.width = bitmap.readUInt32LE(18);
bitmapObject.height = bitmap.readUInt32LE(22);
bitmapObject.paletteSize = bitmap.readUInt32LE(46);
bitmapObject.colorDepth = bitmap.readUInt16LE(28);
var headerSize = 54;

console.dir(bitmapObject);

function BitmapChange(image) {
	this.invoke = function() {
		for (var i = headerSize; i < headerSize + bitmapObject.paletteSize; i++){
			image[i] = 255 - image[i];
		};
	};
	this.toBuffer = function () {return image;}
}

var buf = new Buffer(bitmap);
var changer = new BitmapChange(buf);
changer.invoke();

fs.writeFile('output2.bmp', changer.toBuffer() );

