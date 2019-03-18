const path = require('path');
module.exports = {
    module: {
		rules: [
			{
				test: /\.tiff$/,
				loaders: ['buffer-loader',
					{
						loader: 'image-maxsize-webpack-loader',
						options: {
							'max-width': 300
						}
					}
				]
			}
		]
    },
	resolveLoader: {
		modules: ["../", path.join(__dirname, "node_modules")]
	}
};
