
var PNGENERATOR =
{	
	ms_Canvas: null,
	
	CreateCanvas: function( inWidth, inHeight ) 
	{
		var canvas = document.createElement("canvas");
		canvas.width = inWidth;
		canvas. height = inHeight;
		return canvas;
	},
	
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
		this.ms_Canvas = this.CreateCanvas( inWidth, inHeight );
		this.ms_Canvas.width = inWidth;
		this.ms_Canvas.height = inHeight;
		
		var noise = this.RandomNoise( this.CreateCanvas( inWidth, inHeight ) );
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
	
	CreateVertices: function( inNoise, inGeometry, inDepth, inWidth, inHeight )
	{
		var context = inNoise.getContext('2d'),
			imgData = context.getImageData( 0, 0, inNoise.width, inNoise.height ),
			pixels = imgData.data,
			scaleX = inWidth / inNoise.width,
			scaleY = inHeight / inNoise.height,
			scaleZ = inDepth / 255,
			id = 0,
			offsetX = - inNoise.width / 2,
			offsetY = - inNoise.height / 2;
		
		for( var y = 0; y < inNoise.height; ++y )
		{
			for( var x = 0; x < inNoise.width; ++x )
			{
				inGeometry.vertices.push( new THREE.Vector3( scaleX * ( x + offsetX ), scaleY * ( y + offsetY ), scaleZ * pixels[id * 4 + 1] ) );
				++id;
			}
		}
	},
	
	CreateFaces: function( inGeometry, inWidth, inHeight )
	{
		for( var y = 0; y < inHeight - 1; ++y )
		{
			for( var x = 0; x < inWidth - 1; ++x )
			{
				inGeometry.faces.push( new THREE.Face3( 
					( y + 1 ) * inWidth + x,
					y * inWidth + x, 
					y * inWidth + x + 1
				) );
				inGeometry.faces.push( new THREE.Face3( 
					( y + 1 ) * inWidth + x,
					y * inWidth + x + 1, 
					( y + 1 ) * inWidth + x + 1
				) );
			}
		}
	},
	
	CreateGeometry: function( inNoise, inDepth, inWidth, inHeight, inWidthSegments, inHeightSegments )
	{
		var geometry = new THREE.Geometry(); 
		
		this.CreateVertices( inNoise, geometry, inDepth, inWidth, inHeight );
		this.CreateFaces( geometry, inWidthSegments, inHeightSegments );
		
        geometry.computeCentroids();
        geometry.computeFaceNormals();
        geometry.computeVertexNormals();
		
		return geometry;
	},

	Get: function( inDepth, inWidth, inHeight, inWidthSegments, inHeightSegments )
	{
		var geometry = new THREE.Geometry();
	
		// Manage default parameters
		var depth = inDepth || 10,
			width = inWidth || 100,
			height = inHeight || 100,
			widthSegments = inWidthSegments || 100,
			heightSegments = inHeightSegments || 100;
		
		// Create the Perlin Noise
		var noise = this.PerlinNoise( widthSegments, heightSegments );
		
		// Create the corresponding geometry
		return this.CreateGeometry( noise, depth, width, height, widthSegments, heightSegments );
	}
};