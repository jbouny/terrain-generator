var DESTRUCTURE_EFFECT =
{
	Apply: function( inGeometry, inParameters )
	{
		var densityWidth = inParameters.width / inParameters.widthSegments,
			densityHeight = inParameters.height / inParameters.heightSegments,
			densityDepth = inParameters.depth / 255,
			random = Math.random,
			param = 1;
		
		for( var i = 0; i < inGeometry.vertices.length; ++i )
		{
			var vertex = inGeometry.vertices[i];
			
			vertex.x += random() * densityWidth * param;
			vertex.y += random() * densityDepth * param;
			vertex.z += random() * densityHeight * param;
		}
	},
	
};