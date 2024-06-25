
// threejs 实现一个 圆柱体 颜色全紫 并且可以旋转
import * as THREE from 'three';
import { color, log } from 'three/examples/jsm/nodes/Nodes.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// 创建场景
const scene = new THREE.Scene();
//创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//创建渲染器
const renderer = new THREE.WebGLRenderer()
//定义颜色 红色 蓝色 白色 紫色 粉色 黄色
const colors = [0xff0000, 0x00ff00, 0xFFFFFF, 0xffff00, 0xff00ff, 0x00ffff];
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const geometry = new THREE.CylinderGeometry(5, 5, 20, 32);
const controls = new OrbitControls(camera, renderer.domElement);
const material = new THREE.MeshBasicMaterial({ color: 0x800080 });
// const materials = colors.map(color => new THREE.MeshBasicMaterial({ 'color': color }));
console.log('materials', material);
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 50;
controls.update();
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.z += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
