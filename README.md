Webpack module for max size(width/height)
========================================
To be frank, this is a very small loader :P

ChangeLog
---------
v0.1.0 - Merged code from @danielberndt that added ImageMagick Support and various code cleanup 

Basic Usage
-----------
```
npm install image-maxsize-webpack-loader
```
and in webpack
```js
//example webpack.config.js, i recommand using url with image
module.exports = {
    module: {
        loaders: [
            { test: /\.(png|svg|jpe?g)(\?.*)?$/, loader: "url?limit=800!image!image-maxsize"}
        ]
    }
};
```
```css
@media screen and (max-width: 800px) {
	#abc {
		background: url('./abc.jpg?max-width=800&max-height=600');
	}
}
@media screen and (max-width: 480px) {
	#abc {
		background: url('./abc.jpg?max-width=480'); 
		/* max-width and max-height are both optional, if not provided, it will just be replaced with current height/width of image */
	}	
}
/* basically the above will shrink the file to fit into a 800x600 file, while retaining its aspect ratio */
```

Requirements
------------
GraphicsMagick _or_ ImageMagick

if you prefer to use ImageMagick add `?useImageMagick=true` to the loader.

###Windows User
I truly recommand installing chocolatey, then you can just
```
choco install graphicsmagick
```

Credits
-------
I would have to say, thanks to people who wrote the gm bindings, that made it much easier!
Thanks @danielberndt for cleaning up the code and adding the imagemagick options!
