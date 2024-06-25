// threejs 实现一个 长100宽50高50 的长方形 颜色 分别是 红色 蓝色 白色 紫色 粉色 黄色 
// threejs 实现一个 圆柱体 颜色全紫 并且可以旋转
// threejs 加载一个自定义模型 并且可以用鼠标拖动
import * as THREE from 'three';
import { color, log } from 'three/examples/jsm/nodes/Nodes.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// 创建场景
const scene = new THREE.Scene();
//创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//创建渲染器
const renderer = new THREE.WebGLRenderer({ antialias: true })
//定义颜色 红色 蓝色 白色 紫色 粉色 黄色
const colors = [0xff0000, 0x00ff00, 0xFFFFFF, 0xffff00, 0xff00ff, 0x00ffff];
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const geometry = new THREE.BoxGeometry(50, 100, 50);
const controls = new OrbitControls(camera, renderer.domElement);
// const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const materials = colors.map(color => new THREE.MeshBasicMaterial({ 'color': color }));
console.log('materials', materials);
const cube = new THREE.Mesh(geometry, materials);
scene.add(cube);
camera.position.z = 150;
controls.update();
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
