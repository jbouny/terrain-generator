function MainLoop()
{
	requestAnimationFrame( MainLoop );
	TERRAINGENDEMO.Update();
}

$( function() {
	WINDOW.Initialize();
	
	var parameters = {
		generator: PN_GENERATOR,
		depth: 350,
		width: 600,
		height: 400,
		widthSegments: 300,
		heightSegments: 200,
		param: 4,
		filterparam: 3,
		filter: [ BLUR_FILTER ],
		postgen: [ MOUNTAINS_COLORS ],
		canvas: document.getElementById('heightmap')
	};
	
	TERRAINGENDEMO.Initialize( 'canvas-3d', parameters );
	GUI.Initialize( parameters );
	
	WINDOW.ResizeCallback = function( inWidth, inHeight ) { TERRAINGENDEMO.Resize( inWidth, inHeight ); };
	TERRAINGENDEMO.Resize( WINDOW.ms_Width, WINDOW.ms_Height );
	
	MainLoop();
} );