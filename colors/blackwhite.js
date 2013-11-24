var BLACKWHITE_COLORS =
{
	Apply: function( inGeometry, inParameters )
	{		
		for( var i = 0; i < inGeometry.faces.length; i+=2 )
		{
			var vertex = inGeometry.vertices[inGeometry.faces[i].a],
				depth = vertex.y / inParameters.depth,
				r = 255 * depth * depth,
				g = r,
				b = r,
				color = new THREE.Color( (r << 16) + (g << 8) + b );
			
			inGeometry.faces[i].color = color;
			inGeometry.faces[i+1].color = color;
		}
	},
	
};