var loaderUtils = require("loader-utils");
var gm = require("gm");
var extend = require("extend");

var DEFAULTOPTIONS = {
	skip: false,
	useImageMagick: false
}
module.exports = function(content) {
	this.cacheable(true);
	var loaderOptions = loaderUtils.parseQuery(this.query);
	loaderOptions = extend(true,DEFAULTOPTIONS, loaderOptions);
	if ( loaderOptions.skip ) {
		return content;
	}
	var options = loaderUtils.parseQuery(this.resourceQuery);
	var cb = this.async();
	var width = options['max-width'] || loaderOptions['max-width'];
	var height = options['max-height'] || loaderOptions['max-height'];
	gm(content).options({imageMagick: loaderOptions.useImageMagick}).size(function(err, value){
		if ( err ) {
			return cb(err);
		}
		width = parseInt(width || value.width);
		height = parseInt(height || value.height);
		this.resize(width,height);
		this.toBuffer(function(err, buffer){
			if ( err ) { return cb(err);}
			cb(null, buffer);
		});
	})

}

module.exports.raw = true;
