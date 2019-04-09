
console.clear();

var renderer, scene, camera;
var container = document.getElementById('container');
var distance = 400;

function init() {
  renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  // renderer.setClearColor(0x140b33, 1);
  container.appendChild(renderer.domElement);

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.2, 25000);
  camera.position.set(100, 100, 2000);
  scene.add(camera);

  light = new THREE.PointLight(0xffffff, 1, 4000);
  light.position.set(50, 0, 0);
  light_two = new THREE.PointLight(0xffffff, 1, 4000);
  light_two.position.set(-100, 800, 800);
  lightAmbient = new THREE.AmbientLight(0x404040);
  scene.add(light, light_two, lightAmbient);

  createMoon();
  createSpace();


  // document.addEventListener('mousemove', onMouseMove, false);
  window.addEventListener('resize', onWindowResize, false);
  renderer.render(scene, camera);

}

function createMoon() {
  const geometry = new THREE.SphereGeometry(200, 740, 740);
  const loader = new THREE.TextureLoader();
  loader.crossOrigin = true;
  const texture = loader.load('https://dl.dropboxusercontent.com/s/eq2ienyjboswmol/1.jpg?dl=0');
  const material = new THREE.MeshLambertMaterial({map: texture});
  const mesh = new THREE.Mesh(geometry, material);
  const hlight = new THREE.HemisphereLight(0xfefefe, 0x000000, 1);
  scene.add(light);
  scene.add(mesh);
  scene.add(hlight);
  const render = () => {
    requestAnimationFrame(render);
    mesh.rotation.y += 0.02;
    renderer.render(scene, camera);
  };
  render();
};


function createSpace() {

  dots = new THREE.Object3D();

  for (var i = 0; i < 2500; i++) {
    var circleGeometry = new THREE.SphereGeometry(0.2, Math.random() * 20, Math.random() * 20);
    var material = new THREE.MeshBasicMaterial({
      // color: Math.random() * 0xff00000 - 0xff00000,
      color: 0xffffff,
      shading: THREE.FlatShading,
    })
    var circle = new THREE.Mesh(circleGeometry, material);
    material.side = THREE.DoubleSide;

    circle.position.x = Math.random() * -distance * 60;
    circle.position.y = Math.random() * -distance * 6;
    circle.position.z = Math.random() * distance * 3;
    circle.rotation.y = Math.random() * 2 * Math.PI;
    circle.scale.x = circle.scale.y = circle.scale.z = Math.random() * 6 + 5;
    dots.add(circle);
  }

  dots.position.x = 7000;
  dots.position.y = 900;
  dots.position.z = -2000;
  dots.rotation.y = Math.PI * 600;
  dots.rotation.z = Math.PI * 500;

  scene.add(dots);
};

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.updateProjectionMatrix();
};

// function onMouseMove(event) {
//   mouseX = event.clientX - window.innerWidth / 2;
//   mouseY = event.clientY - window.innerHeight / 2;
//   camera.position.x += (mouseX - camera.position.x) * 0.05;
//   camera.position.y += (mouseY - camera.position.y) * 0.05;
//   camera.lookAt(scene.position);
// };

function animate() {
  requestAnimationFrame(animate);
  render();
};

function render() {
  var timer = 0.00001 * Date.now();

  for (var i = 0, l = dots.children.length; i < l; i++) {
    var object = dots.children[i];
    object.rotation.y += 5 * Math.PI / 500;
    object.position.y += 0.2 * Math.cos(timer + i);
    object.position.x += 0.5 * Math.cos(timer + i);
  }
  renderer.render(scene, camera);
}

init();
animate();
