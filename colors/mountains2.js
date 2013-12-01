var MOUNTAINS2_COLORS =
{
	ms_Canvas: null,
	ms_Gradient: null,
	
	GenerateGradient: function()
	{
		this.ms_Canvas = TERRAINGEN.CreateCanvas( 255, 1 );
		var context = this.ms_Canvas.getContext( "2d" );
		
		var gradient = context.createLinearGradient( 0, 0, 255, 0 );
		
		gradient.addColorStop( 0.0, '#061701' );  
		gradient.addColorStop( 0.1, '#205E0C' );  
		gradient.addColorStop( 0.2, '#667755' );
		gradient.addColorStop( 0.6, '#999999' );
		gradient.addColorStop( 0.8, '#FFFFFF' );
		
		context.fillStyle = gradient;
		context.rect( 0, 0, this.ms_Canvas.width, this.ms_Canvas.height );
		context.fill();
		
		this.ms_Gradient = context.getImageData( 0, 0, this.ms_Canvas.width, this.ms_Canvas.height ).data;
	},
	
	Apply: function( inGeometry, inParameters )
	{		
		if( this.ms_Canvas == null )
			this.GenerateGradient();
		
		for( var i = 0; i < inGeometry.faces.length; i+=2 )
		{
			var vertex = inGeometry.vertices[inGeometry.faces[i].a],
				depth = vertex.y / inParameters.depth,
				indice = Math.round( depth * 255 );

			var r = this.ms_Gradient[ indice * 4 ] * ( 1 + 2 * inParameters.alea.Random() * Math.max( 0, ( 0.3 - depth ) ) ),
				g = Math.min( 255, this.ms_Gradient[ indice * 4 + 1 ] * ( 1 + 2 * inParameters.alea.Random() * Math.max( 0, ( 0.3 - depth ) ) ) ),
				b = this.ms_Gradient[ indice * 4 + 2 ];
			
			var color = new THREE.Color( (r << 16) + (g << 8) + b );
			inGeometry.faces[i].color = color;
			inGeometry.faces[i+1].color = color;
		}
	},
	
};