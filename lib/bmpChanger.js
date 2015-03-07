'use strict';

module.exports = function (image) {
	var HEADER_SIZE = 54;
	var metadata = {
		type: image.toString('utf-8', 0, 2), 
		size: image.readUInt32LE(2), 
		startOfPixels: image.readUInt32LE(10),
		width: image.readUInt32LE(18),
		height: image.readUInt32LE(22),
		paletteSize: image.readUInt32LE(46),
		colorDepth: image.readUInt16LE(28)
	};
	this.invert = function() {
		for (var i = HEADER_SIZE; i < HEADER_SIZE + metadata.paletteSize; i++) {
			image[i] = 255 - image[i];
		}
		return this;
	};
	this.removeGreen = function() {
		for (var i = HEADER_SIZE; i < HEADER_SIZE + metadata.paletteSize; i = i+4) {
			image[i+1] = 0;
		}
		return this;
	};
	this.removeRed = function() {
		for (var i = HEADER_SIZE; i < HEADER_SIZE + metadata.paletteSize; i = i+4) {
			image[i+2] = 0;
		}
		return this;
	};
	this.toBuffer = function() {return image;};
};
