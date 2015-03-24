var loaderUtils = require("loader-utils");
var gm = require("gm");
var extend = require("extend");

var DEFAULTOPTIONS = {
	skip: false
}
module.exports = function(content) {
	var loaderOptions = loaderUtils.parseQuery(this.query);
	loaderOptions = extend(true,DEFAULTOPTIONS, loaderOptions);
	if ( loaderOptions.skip ) {
		return content;
	}
	var options = loaderUtils.parseQuery(this.resourceQuery), cb = this.async(), width = options['max-width'], height = options['max-height'];
	gm(content, this.resource).size(function(err, value){
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
