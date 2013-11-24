function MainLoop()
{
	requestAnimationFrame( MainLoop );
	TERRAINGENDEMO.Update();
}

$( function() {
	WINDOW.Initialize();
	
	var parameters = {
		generator: PN_GENERATOR,
		width: 500,
		height: 500,
		widthSegments: 150,
		heightSegments: 150,
		depth: 150,
		param: 3,
		filterparam: 1,
		filter: [ BLUR_FILTER ],
		postgen: [ MOUNTAINS_COLORS ],
		effect: [ DESTRUCTURE_EFFECT ],
		canvas: document.getElementById('heightmap')
	};
	
	TERRAINGENDEMO.Initialize( 'canvas-3d', parameters );
	GUI.Initialize( parameters );
	
	WINDOW.ResizeCallback = function( inWidth, inHeight ) { TERRAINGENDEMO.Resize( inWidth, inHeight ); };
	TERRAINGENDEMO.Resize( WINDOW.ms_Width, WINDOW.ms_Height );
	
	MainLoop();
} );