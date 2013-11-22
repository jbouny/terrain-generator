var GENERATORS =
{
	Generator: {
		PerlinNoise: 0
	},
	PostGen: {
		None: 0,
		Mountains: 1
	},
	ms_Generators: [ PN_GENERATOR ],
	ms_Colors: [ null, MOUNTAINS_COLORS ],
};

var GUI =
{
	ms_Parameters: {
	},

	Initialize: function( inParameters )
	{
		gui = new dat.GUI();
		GUI.ms_Parameters = inParameters;
		guiParameters = 
		{
			width: inParameters.width,
			height: inParameters.height,
			widthSegments: inParameters.widthSegments,
			heightSegments: inParameters.heightSegments,
			depth: inParameters.depth,
			param: inParameters.param,
			
			generator: GENERATORS.Generator.PerlinNoise,
			colors: GENERATORS.PostGen.Mountains,
			
			heightMap: false,
			
			github: function() {},
			
			update: function() { GUI.Update(); }
		};
		
		var terrainFolder = gui.addFolder('Terrain');
			terrainFolder.add( guiParameters, 'width' ).min(1).max(1000).step(1).name('Width').onChange( function( inValue ) {
				GUI.ms_Parameters.width = inValue;
			} );
			terrainFolder.add( guiParameters, 'height' ).min(1).max(1000).step(1).name('Height').onChange( function( inValue ) {
				GUI.ms_Parameters.height = inValue;
			} );
			terrainFolder.add( guiParameters, 'widthSegments' ).min(1).max(500).step(1).name('Segments width').onChange( function( inValue ) {
				GUI.ms_Parameters.widthSegments = inValue;
			} );
			terrainFolder.add( guiParameters, 'heightSegments' ).min(1).max(500).step(1).name('Segments height').onChange( function( inValue ) {
				GUI.ms_Parameters.heightSegments = inValue;
			} );
			terrainFolder.add( guiParameters, 'depth' ).min(0).max(500).step(1).name('Depth').onChange( function( inValue ) {
				GUI.ms_Parameters.depth = inValue;
			} );
		terrainFolder.open();
		
		var generatorFolder = gui.addFolder('Generator');
			generatorFolder.add( guiParameters, 'generator', GENERATORS.Generator ).name('Generator').onChange( function( inValue ) {
				GUI.ms_Parameters.generator = GENERATORS.ms_Generators[inValue];
			} );
			generatorFolder.add( guiParameters, 'param' ).min(1.1).max(50).step(0.1).name('Parameter').onChange( function( inValue ) {
				GUI.ms_Parameters.param = inValue;
			} );
			generatorFolder.add( guiParameters, 'colors', GENERATORS.PostGen ).name('Colors').onChange( function( inValue ) {
				GUI.ms_Parameters.postgen = ( inValue == 0 )? [] : [ GENERATORS.ms_Colors[inValue] ];
			} );
		generatorFolder.open();
		
		var otherFolder = gui.addFolder('Other');
			otherFolder.add( guiParameters, 'heightMap' ).name('Height map').onChange( function( inValue ) {
				if( inValue )
					$('#heightmap').show();
				else
					$('#heightmap').hide();
			} );
			otherFolder.add( guiParameters, 'github' ).name('<a href="https://github.com/jbouny/terrain-generator" target="_blank">GitHub</a>');
		otherFolder.open();
		
		gui.add( guiParameters, 'update' ).name('<b>Generate</b>');
	},
	
	Update: function()
	{
		console.log( GUI.ms_Parameters );
		TERRAINGENDEMO.Load( GUI.ms_Parameters );
	}
};