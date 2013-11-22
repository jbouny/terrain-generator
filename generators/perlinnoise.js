
var PN_GENERATOR =
{
	ms_Canvas: null,
	
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

	PerlinNoise: function( inWidth, inHeight )
	{
		/**
		 * This part is based on a snippest :
		 * https://gist.github.com/donpark/1796361
		 */
		// Generate the noise with a 2d canvas
		this.ms_Canvas.width = inWidth;
		this.ms_Canvas.height = inHeight;
		
		var noise = this.RandomNoise( TERRAINGEN.CreateCanvas( inWidth, inHeight ) );
		var context = this.ms_Canvas.getContext("2d");
		context.save();
    
		/* Scale random iterations onto the canvas to generate Perlin noise. */
		for( var size = 4; size <= noise.width; size *= 3 ) 
		{
			var x = ( Math.random() * ( noise.width - size ) ) | 0,
				y = ( Math.random() * ( noise.height - size ) ) | 0;
			context.globalAlpha = 4 / size;
			context.drawImage( noise, x, y, size, size, 0, 0, inWidth, inHeight );
		}
 
		context.restore();
		
		return this.ms_Canvas;
	},

	Get: function( inParameters )
	{
		var geometry = new THREE.Geometry();
		
		if( typeof inParameters.canvas == 'undefined' )
			inParameters.canvas = TERRAINGEN.CreateCanvas( inParameters.width, inParameters.height );
		this.ms_Canvas = inParameters.canvas;
		
		// Create the Perlin Noise
		var noise = this.PerlinNoise( inParameters.widthSegments, inParameters.heightSegments );
		
		return noise;
	}
};