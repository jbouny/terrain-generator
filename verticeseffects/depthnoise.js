var DEPTHNOISE_EFFECT =
{
	Apply: function( inGeometry, inParameters )
	{
		var scaleDepth = inParameters.depth / 255,
			random = Math.random;
			
		for( var i = 0; i < inGeometry.vertices.length; ++i )
			inGeometry.vertices[i].y += scaleDepth * random();
	},
	
};