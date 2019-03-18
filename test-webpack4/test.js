const tiff = require('tiff');
const expect = require('chai').expect;
describe("image", function(){
    it('should resize it to maximum 300px width', function(){
        const image = require('./test-image.tiff')
        const decodedImg = tiff.decode(image);
        expect(decodedImg[0].width).to.equal(300);
    })
    it('should resize it to maximum 200px width', function(){
        const image = require('./test-image.tiff?max-width=200')
        const decodedImg = tiff.decode(image);
        expect(decodedImg[0].width).to.equal(200);
    })
    it('should resize it to maximum 200px height', function(){
        const image = require('./test-image.tiff?max-height=200')
        const decodedImg = tiff.decode(image);
        expect(decodedImg[0].height).to.equal(200);
    })
    it('should be within the given constraints', function(){
        // since the image is a square, it should be a square of the smaller number
        const image = require('./test-image.tiff?max-height=200&max-width=100')
        const decodedImg = tiff.decode(image);
        expect(decodedImg[0].width).to.equal(100);
        expect(decodedImg[0].height).to.equal(100);
    })
})

