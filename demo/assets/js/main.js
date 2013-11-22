function MainLoop()
{
	PNGDEMO.Update();
	setTimeout( MainLoop, 1000 / 60 );
}

$( function() {
	WINDOW.Initialize();
	PNGDEMO.Initialize( 'canvas-3d', 4, 10, 10, 200, 200 );
	
	WINDOW.ResizeCallback = function( inWidth, inHeight ) { PNGDEMO.Resize( inWidth, inHeight ); };
	PNGDEMO.Resize( WINDOW.ms_Width, WINDOW.ms_Height );
	
	MainLoop();
} );