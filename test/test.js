'use strict';

var expect = require('chai').expect;
var BitmapChanger = require('../lib/bmpChanger');
var HEADER_SIZE = 54;

var createBitmap = function(array) {
	var paletteSize  = array.length;
	var newBitmap = new Buffer(HEADER_SIZE + paletteSize);	
	newBitmap.writeUInt32LE(paletteSize, 46);
	for(var i = 0; i < array.length; i++) {
		newBitmap[i + HEADER_SIZE] = array[i];
	}
	return newBitmap;
};

var extractExpectedOutput = function(image) {
	var expected = [];
	for(var i = 0; i < 4; i++) {
		expected[i] = image[HEADER_SIZE + i];
	}
	return expected;
};

describe('BitmapChanger', function() {
	var bmp; 
	var bmpChanger;
	var expected = [];
	
	beforeEach(function () {
	  	bmp = createBitmap([254, 254, 254, 254]);
	  	bmpChanger = new BitmapChanger(bmp); 	
	});

	describe('#invert', function() {
		it('should return 255 - X', function() {
			var expected = extractExpectedOutput(bmpChanger.invert().toBuffer());
			expect(expected).to.eql([1, 1, 1, 1]);
		});
	});

	describe('#removeRed', function() {
		it('should return 0 in the second index', function() {
		  	var expected = extractExpectedOutput(bmpChanger.removeRed().toBuffer());
			expect(expected).to.eql([254, 254, 0, 254]);
		});
	});

	describe('#removeGreen', function() {
		it('should return 0 in the first index', function() {
			var expected = extractExpectedOutput(bmpChanger.removeGreen().toBuffer());
			expect(expected).to.eql([254, 0, 254, 254]);
		});
	});
});