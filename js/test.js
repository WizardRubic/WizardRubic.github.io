var camera, scene, renderer, canvas;
var square;
var backgroundScalar = 0.0018; // scales background object apporpriately
var startTime;


// don't change animation, only thing we want to change is the camera and renderer size


// called upon startup
// initializes the window, three js scene, and begins the animation
function init() {
    initWindow(); 

    initThree();

    animate();
}

function initThree() {
    scene = new THREE.Scene();
    
    var corners = calculateLowerCorner();
    square = makeSquare(corners.lowerCorner, corners.upperCorner);
    scene.add(square);

    renderer = new THREE.WebGLRenderer( { antialias: true, canvas: canvas} );
    document.body.appendChild( renderer.domElement );

    resizeCanvas();
}

function updateSquare(lowerCorner, upperCorner) {
    var x1, x2, y1, y2; 
    x1 = lowerCorner.x;
    x2 = upperCorner.x;
    y1 = lowerCorner.y;
    y2 = upperCorner.y;

    square.geometry.vertices[0].x = x1;
    square.geometry.vertices[0].y = y1;
    square.geometry.vertices[1].x = x1;
    square.geometry.vertices[1].y = y2;
    square.geometry.vertices[2].x = x2;
    square.geometry.vertices[2].y = y2;
    square.geometry.vertices[3].x = x2;
    square.geometry.vertices[3].y = y1;

    // square.geometry.vertices[0] = new THREE.Vector3(x1, y1, 0);
    // square.geometry.vertices[1] = new THREE.Vector3(x1, y2, 0);
    // square.geometry.vertices[2] = new THREE.Vector3(x2, y2, 0);
    // square.geometry.vertices[3] = new THREE.Vector3(x2, y1, 0);
    square.geometry.dynamic = true;
    square.geometry.verticesNeedUpdate = true;
    // console.log("lower cornerx: " + lowerCorner.x + ", lowerCornery: " + lowerCorner.y + ", upperCorner.x: " + upperCorner.x + ", upperCorner.y: " + upperCorner.y);

    // update the materials
    var corners = calculateLowerCorner();
    // tuniform.iResolution.value.x = window.innerWidth; // window.innerWidth;
    // tuniform.iResolution.value.y = window.innerHeight; // window.innerHeight;
    square.material.uniforms.iResolution.value.x = (corners.upperCorner.x - corners.lowerCorner.x) * 0.3; // window.innerWidth;
    square.material.uniforms.iResolution.value.y = (corners.upperCorner.y - corners.lowerCorner.y) * 0.3; // window.innerHeight;
    // square.material.uniforms.iResolution.value = whatever;


}

// square is defined by the lower left corner and upper right corner
function makeSquare(lowerCorner, upperCorner) {
    var squareGeometry = new THREE.Geometry();
    var x1, x2, y1, y2; 
    x1 = lowerCorner.x;
    x2 = upperCorner.x;
    y1 = lowerCorner.y;
    y2 = upperCorner.y;

    squareGeometry.vertices.push(new THREE.Vector3(x1, y1, 0));
    squareGeometry.vertices.push(new THREE.Vector3(x1, y2, 0));
    squareGeometry.vertices.push(new THREE.Vector3(x2, y2, 0));
    squareGeometry.vertices.push(new THREE.Vector3(x2, y1, 0));
    squareGeometry.faces.push(new THREE.Face3(0, 2, 1));
    squareGeometry.faces.push(new THREE.Face3(0, 3, 2));
    squareGeometry.dynamic = true;
    // var squareMaterial = new THREE.MeshNormalMaterial();
    var squareMaterial = new THREE.MeshBasicMaterial( { color: 0xF6831E, side: THREE.DoubleSide } );

    // ret = new THREE.Mesh(squareGeometry, squareMaterial);
    ret = new THREE.Mesh(squareGeometry, makeMaterial());


    return ret;
}

function makeMaterial() {
    startTime = Date.now();
    var tuniform = {
        iGlobalTime:    { type: 'f', value: 0.0 },
          iResolution: {
            type: "v2",
            value: new THREE.Vector2()
          }
    };
    var corners = calculateLowerCorner();
    // tuniform.iResolution.value.x = window.innerWidth; // window.innerWidth;
    // tuniform.iResolution.value.y = window.innerHeight; // window.innerHeight;
    tuniform.iResolution.value.x = (corners.upperCorner.x - corners.lowerCorner.x) * 0.3; // window.innerWidth;
    tuniform.iResolution.value.y = (corners.upperCorner.y - corners.lowerCorner.y) * 0.3; // window.innerHeight;
    var material = new THREE.ShaderMaterial({
          uniforms: tuniform,
          vertexShader: document.getElementById('vertexShader').textContent,
          fragmentShader: document.getElementById('fragmentShader').textContent
        });
    return material;

}

function initWindow() {
    // console.log("width: " + window.innerWidth + ", height: " + window.innerHeight);
    window.addEventListener('resize', resizeCanvas, false);
    canvas = document.getElementById("canvasid");
}

function calculateLowerCorner() {
    var lowerCorner = new THREE.Vector2(-1.0 * window.innerWidth * backgroundScalar / 2.0, -1.0 * window.innerHeight * backgroundScalar / 2.0);
    var upperCorner = new THREE.Vector2(       window.innerWidth * backgroundScalar / 2.0,        window.innerHeight * backgroundScalar / 2.0);
    // var lowerCorner = new THREE.Vector2(0,0);
    // var upperCorner = new THREE.Vector2(1,1);
    return {lowerCorner: lowerCorner, upperCorner: upperCorner}; 
}


function resizeCanvas() {
    var corners = calculateLowerCorner();
    updateSquare(corners.lowerCorner, corners.upperCorner);

    //https://stackoverflow.com/questions/14614252/how-to-fit-camera-to-object
    var fov = 2 * Math.atan( (window.innerHeight * backgroundScalar) / ( 2 * 1.0 ) ) * ( 180 / Math.PI );
    camera = new THREE.PerspectiveCamera( fov, window.innerWidth / window.innerHeight, 0.01, 1000 );
    // camera.position.z = 2.1 / (window.innerWidth / window.innerHeight);

    camera.position.z = 1;
    camera.updateProjectionMatrix();
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
    var deltams = Date.now() - startTime;
    var deltas = deltams / 1000.0;
    // console.log(startTime);
    square.material.uniforms.iGlobalTime.value = deltas;
    requestAnimationFrame( animate );

    renderer.render( scene, camera );

}