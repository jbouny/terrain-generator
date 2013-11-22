function MainLoop()
{
	requestAnimationFrame( MainLoop );
	TERRAINGENDEMO.Update();
}

$( function() {
	WINDOW.Initialize();
	
	var parameters = {
		generator: PN_GENERATOR,
		depth: 80,
		width: 200,
		height: 200,
		widthSegments: 100,
		heightSegments: 100,
		postgen: [ MOUNTAINS_COLORS ]
	};
	
	TERRAINGENDEMO.Initialize( 'canvas-3d', parameters );
	
	WINDOW.ResizeCallback = function( inWidth, inHeight ) { TERRAINGENDEMO.Resize( inWidth, inHeight ); };
	TERRAINGENDEMO.Resize( WINDOW.ms_Width, WINDOW.ms_Height );
	
	MainLoop();
} );