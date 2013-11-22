var PNGDEMO =
{
	ms_Canvas: null,
	ms_Renderer: null,
	ms_Camera: null, 
	ms_Scene: null, 
	ms_Controls: null,
	ms_IsDisplaying: false,
	
	Enable: ( function() 
	{
        try 
		{
			var aCanvas = document.createElement( 'canvas' ); 
			return !! window.WebGLRenderingContext && ( aCanvas.getContext( 'webgl' ) || aCanvas.getContext( 'experimental-webgl' ) ); 
		} 
		catch( e ) { return false; } 
	} )(),
	
	Initialize: function( inIdCanvas, inDepth, inWidth, inHeight, inWidthSegments, inHeightSegments )
	{
		this.ms_Canvas = $( '#'+inIdCanvas );
		
		// Initialize Renderer, Camera and Scene
		this.ms_Renderer = this.Enable? new THREE.WebGLRenderer() : new THREE.CanvasRenderer();
		this.ms_Canvas.html( this.ms_Renderer.domElement );
		this.ms_Scene = new THREE.Scene();
		
		this.ms_Camera = new THREE.PerspectiveCamera( 55.0, Window.ms_Width / Window.ms_Height, 0.01, 10000 );
		this.ms_Camera.position.set( inWidth / 2, -inHeight / 1.5, Math.max( inWidth, inHeight ) / 1.5 );
		this.ms_Camera.up = new THREE.Vector3( 0, 0, 1 );
		this.ms_Camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );
		
		// Initialize Trackball control		
		this.ms_Controls = new THREE.TrackballControls( this.ms_Camera );
		this.ms_Controls.staticMoving = true;
		this.ms_Controls.panSpeed = 0.8;
		this.ms_Controls.addEventListener( 'change', function() { PNGDEMO.Display(); } );
	
		// Add light
		this.ms_Scene.add( this.CreatePointLight( 0xffffff, inWidth, inHeight, Math.max( inWidth, inHeight ) * 2 ) );
		
		// Create terrain
		var terrainGeo = PNGENERATOR.Get( inDepth, inWidth, inHeight, inWidthSegments, inHeightSegments );
		var terrainMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, shading: THREE.FlatShading } );
		var terrain = new THREE.Mesh( terrainGeo, terrainMaterial );
		this.ms_Scene.add( terrain );
	},
	
	CreatePointLight: function( inColor, inX, inY, inZ )
	{
		var aLight = new THREE.PointLight( inColor, 1, 100 );
		aLight.position.set( inX, inY, inZ );
		return aLight;
	},
	
	Display: function()
	{
		this.ms_Renderer.render( this.ms_Scene, this.ms_Camera );
	},
	
	Update: function()
	{
		this.ms_Controls.update();
	},
	
	Resize: function( inWidth, inHeight )
	{
		this.ms_Camera.aspect =  inWidth / inHeight;
		this.ms_Camera.updateProjectionMatrix();
		this.ms_Renderer.setSize( inWidth, inHeight );
		this.ms_Canvas.html( this.ms_Renderer.domElement );
		this.ms_Controls.handleResize();
		this.Display();
	}
};