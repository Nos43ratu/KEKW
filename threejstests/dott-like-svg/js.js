let camera, controls, scene, renderer, geometry;
let size = 400;
let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");
canvas.width = size;
canvas.height = size;
canvas.classList.add("testcanvas");
document.body.appendChild(canvas);
let imagedata = [];

let img = new Image();
img.onload = () => {
  ctx.drawImage(img, 0, 0, 400, 200);

  let data = ctx.getImageData(0, 0, 400, 200);
  data = data.data;
  for (var y = 0; y < size; y++) {
    for (var x = 0; x < size; x++) {
      var red = data[(size * y + x) * 4];
      var green = data[(size * y + x) * 4 + 1];
      var blue = data[(size * y + x) * 4 + 2];
      var alpha = data[(size * y + x) * 4 + 3];
      if (alpha > 0) {
        imagedata.push([10 * (x - size / 2), 10 * (size / 2 - y)]);
      }
    }
  }

  const init = () => {
    //scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xccccccc);
    //renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    //get item
    const container = document.getElementById("item");
    container.appendChild(renderer.domElement);
    //camera
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      5000
    );
    camera.position.z = 500;
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    //on scene

    geometry = new THREE.Geometry();
    const material = new THREE.PointsMaterial({
      size: 12,
      vertexColors: THREE.VertexColors,
    });
    let x, y, z;

    // for (let i = 0; i < 100; i++) {
    //   x = Math.sin(i / 10) * 100;
    //   y = 0;
    //   z = i * 10;
    //   geometry.vertices.push(new THREE.Vector3(x, y, z));
    //   geometry.colors.push(new THREE.Color(i / 100, 1, 1));
    // }
    imagedata.forEach((e, index) => {
      geometry.vertices.push(new THREE.Vector3(e[0], e[1], Math.random() * 10));
      geometry.colors.push(
        new THREE.Color(Math.random(), Math.random(), Math.random())
      );
    });

    const points = new THREE.Points(geometry, material);

    scene.add(points);

    window.addEventListener("resize", onWindowsResize, false);
  };
  const onWindowsResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth / window.innerHeight);
  };

  let i = 0;
  const animate = () => {
    i++;
    requestAnimationFrame(animate);

    geometry.vertices.forEach((e, index) => {
      let dx, dy, dz;
      dx = Math.sin(i / 10 + index / 1000);
      dy = 0;
      dz = 0;
      e.add(new THREE.Vector3(dx, dy, dz));
    });

    geometry.verticesNeedUpdate = true;
    render();
  };
  const render = () => {
    renderer.render(scene, camera);
  };

  init();
  animate();
};
img.src = "/Ресурс 1.svg";
