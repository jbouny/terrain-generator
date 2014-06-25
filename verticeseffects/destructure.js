var DESTRUCTURE_EFFECT =
{
	Apply: function( inGeometry, inParameters )
	{
		var positions = inGeometry.getAttribute( 'position' ).array,
			densityWidth = inParameters.width / inParameters.widthSegments,
			densityHeight = inParameters.height / inParameters.heightSegments,
			densityDepth = inParameters.depth / 255,
			param = 1;
			
		for( var i = 0; i < positions.length; i++ )
		{
			positions[i] += ( inParameters.alea.Random() - 0.5 ) * densityWidth * param;
		}
	},
	
};