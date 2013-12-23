var DESTRUCTURE_EFFECT =
{
	Apply: function( inGeometry, inParameters )
	{
		var densityWidth = inParameters.width / inParameters.widthSegments,
			densityHeight = inParameters.height / inParameters.heightSegments,
			densityDepth = inParameters.depth / 255,
			param = 1;
			
		for( var i = 1; i < inParameters.widthSegments - 1; ++i )
		{
			for( var j = 1; j < inParameters.heightSegments - 1; ++j )
			{
				var vertex = inGeometry.vertices[j * inParameters.widthSegments + i];
				
				vertex.x += ( inParameters.alea.Random() - 0.5 ) * densityWidth * param;
				vertex.y += ( inParameters.alea.Random() - 0.5 ) * densityDepth * param;
				vertex.z += ( inParameters.alea.Random() - 0.5 ) * densityHeight * param;
			}
		}
	},
	
};