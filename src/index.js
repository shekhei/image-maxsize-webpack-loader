var loaderUtils = require("loader-utils");
var gm = require("gm");
var extend = require("extend");

var DEFAULTOPTIONS = {
	useImageMagick: false
}
module.exports = function(content) {
	this.cacheable(true);
	const loaderOptions = extend(true,DEFAULTOPTIONS, loaderUtils.getOptions(this));
    let options = {};
    if ( typeof this.resourceQuery === 'string' && this.resourceQuery ) {
	    options = loaderUtils.parseQuery(this.resourceQuery);
    }
	const cb = this.async();
	const width = options['max-width'] || loaderOptions['max-width'];
	const height = options['max-height'] || loaderOptions['max-height'];
	gm(content).options({imageMagick: loaderOptions.useImageMagick}).size(function(err, value){
		if ( err ) {
			return cb(err);
		}
		const _width = parseInt(width || value.width);
		const _height = parseInt(height || value.height);
		this.resize(_width,_height);
		this.toBuffer(function(err, buffer){
			if ( err ) { return cb(err);}
			cb(null, buffer);
		});
	})

}

module.exports.raw = true;
