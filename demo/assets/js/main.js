function MainLoop()
{
	requestAnimationFrame( MainLoop );
	TERRAINGENDEMO.Update();
}

$( function() {
	WINDOW.Initialize();
	
	var parameters = {
		generator: PN_GENERATOR,
		depth: 250,
		width: 400,
		height: 400,
		widthSegments: 150,
		heightSegments: 150,
		param: 4,
		postgen: [ MOUNTAINS_COLORS ],
		canvas: document.getElementById('heightmap')
	};
	
	TERRAINGENDEMO.Initialize( 'canvas-3d', parameters );
	GUI.Initialize( parameters );
	
	WINDOW.ResizeCallback = function( inWidth, inHeight ) { TERRAINGENDEMO.Resize( inWidth, inHeight ); };
	TERRAINGENDEMO.Resize( WINDOW.ms_Width, WINDOW.ms_Height );
	
	MainLoop();
} );