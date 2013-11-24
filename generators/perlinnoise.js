var PN_GENERATOR =
{	
	RandomNoise: function( inCanvas, inX, inY, inWidth, inHeight, inAlpha ) 
	{		
		var g = inCanvas.getContext("2d"),
			imageData = g.getImageData( 0, 0, inCanvas.width, inCanvas.height ),
			random = Math.random,
			pixels = imageData.data;
		
		for( var i = 0; i < pixels.length; i += 4 )
		{
			pixels[i] = pixels[i+1] = pixels[i+2] = ( random() * 256 ) | 0;
			pixels[i+3] = 255;
		}
		
		g.putImageData( imageData, 0, 0 );
		return inCanvas;
	},

	PerlinNoise: function( inParameters )
	{
		/**
		 * This part is based on the snippest :
		 * https://gist.github.com/donpark/1796361
		 */
		
		var noise = this.RandomNoise( TERRAINGEN.CreateCanvas( inParameters.widthSegments, inParameters.heightSegments ) );
		var context = inParameters.canvas.getContext("2d");
		context.save();
    
		/* Scale random iterations onto the canvas to generate Perlin noise. */
		for( var size = 4; size <= noise.width; size *= inParameters.param ) 
		{
			var x = ( Math.random() * ( noise.width - size ) ) | 0,
				y = ( Math.random() * ( noise.height - size ) ) | 0;
			context.globalAlpha = 4 / size;
			context.drawImage( noise, x, y, size, size, 0, 0, inParameters.widthSegments, inParameters.heightSegments );
		}
 
		context.restore();
		
		return inParameters.canvas;
	},

	Get: function( inParameters )
	{
		var geometry = new THREE.Geometry();
		
		inParameters.param = Math.max( 1.1, inParameters.param );
		
		// Create the Perlin Noise
		var noise = this.PerlinNoise( inParameters );
		
		return noise;
	}
};