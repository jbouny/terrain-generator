var PN_GENERATOR =
{	
	RandomNoise: function( inCanvas, inX, inY, inWidth, inHeight, inAlpha ) 
	{
		inX = inX || 0;
		inY = inY || 0;
		inWidth = inWidth || inCanvas.width;
		inHeight = inHeight || inCanvas.height;
		inAlpha = inAlpha || 255;
		
		var g = inCanvas.getContext("2d"),
			imageData = g.getImageData( inX, inY, inWidth, inHeight ),
			random = Math.random,
			pixels = imageData.data,
			n = pixels.length,
			i = 0;
			
		while (i < n) 
		{
			pixels[i++] = pixels[i++] = pixels[i++] = ( random() * 256 ) | 0;
			pixels[i++] = inAlpha;
		}
		
		g.putImageData( imageData, inX, inY );
		return inCanvas;
	},

	PerlinNoise: function( inParameters )
	{
		/**
		 * This part is based on the snippest :
		 * https://gist.github.com/donpark/1796361
		 */
		
		var noise = this.RandomNoise( TERRAINGEN.CreateCanvas( inParameters.width, inParameters.height ) );
		var context = inParameters.canvas.getContext("2d");
		context.save();
    
		/* Scale random iterations onto the canvas to generate Perlin noise. */
		for( var size = 4; size <= noise.width; size *= inParameters.param ) 
		{
			var x = ( Math.random() * ( noise.width - size ) ) | 0,
				y = ( Math.random() * ( noise.height - size ) ) | 0;
			context.globalAlpha = 4 / size;
			context.drawImage( noise, x, y, size, size, 0, 0, inParameters.width, inParameters.height );
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