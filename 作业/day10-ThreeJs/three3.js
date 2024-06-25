// threejs 实现一个 长100宽50高50 的长方形 颜色 分别是 红色 蓝色 白色 紫色 粉色 黄色 
// threejs 实现一个 圆柱体 颜色全紫 并且可以旋转
// threejs 加载一个自定义模型 并且可以用鼠标拖动
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as three from "three";
const scene = new three.Scene()
const loader = new GLTFLoader()
loader.load(
  './scene.gltf',
  function (gltf) {
    scene.add(gltf.scene)
  }
)
const camera = new three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 20
camera.position.y = 1
const light = new three.DirectionalLight(0xffffff, 30)
const ambietLight = new three.AmbientLight(0xffffff, 10)
light.position.set(0, 1, 0)
scene.add(light, ambietLight);

const renderer = new three.WebGLRenderer()
const controls = new OrbitControls(camera, renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.render(scene, camera)
document.body.appendChild(renderer.domElement)
controls.update();
function animate() {
  requestAnimationFrame(animate)
  scene.traverse((obj) => {
    if (obj.isMesh) {
      obj.rotation.z += 0.005
    }
  })
  renderer.render(scene, camera)
}
animate()