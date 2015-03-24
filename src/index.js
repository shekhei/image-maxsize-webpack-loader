var DEFAULTOPTIONS = {
	skip: false,
	useImageMagick: false
}
module.exports = function(content) {
	var loaderOptions = require('loader-utils').parseQuery(this.query);
	loaderOptions = require('extend')(true,DEFAULTOPTIONS, loaderOptions);
	if ( loaderOptions.skip ) {
		return content;
	}
	var options = require('loader-utils').parseQuery(this.resourceQuery), cb = this.async(), width = options['max-width'], height = options['max-height'];
	require('gm')(content, this.resource).options({imageMagick: loaderOptions.useImageMagick}).size(function(err, value){
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