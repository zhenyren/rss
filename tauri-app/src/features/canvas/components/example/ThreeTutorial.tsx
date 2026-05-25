import logger from "@/shared/utils/logger";
import { useEffect, useRef } from "react";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import * as THREE from "three";

export default function ThreeTutorial() {
  // 1. 创建 div 引用
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logger.i("useEffect", THREE);
    /// 创建3D场景对象Scene
    initScene();
  }, []);

  function initScene() {
    // 创建3D场景对象Scene
    const scene = new THREE.Scene();

    // 立方体
    const geometry = new THREE.BoxGeometry(10, 10, 10);
    // 材质
    const material = new THREE.MeshBasicMaterial({
      color: 0x0000ff, //设置材质颜色
      transparent: true, //开启透明
      opacity: 0.5, //设置透明度
    });
    // 网格
    const mesh = new THREE.Mesh(geometry, material);
    // 位置
    mesh.position.set(0, 0, 0);
    scene.add(mesh);

    // 边缘
    const edges = new THREE.EdgesGeometry(geometry); // 生成边缘
    // 边缘材质
    const edgeMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff, // 描边颜色：白色
      linewidth: 2, // 线条宽度
    });
    // 边缘网格
    const edgeMesh = new THREE.Line(edges, edgeMaterial);
    scene.add(edgeMesh);

    // 相机
    const camera = new THREE.PerspectiveCamera();
    // 相机位置
    camera.position.set(0, 0, 100);
    // 相机看向
    camera.lookAt(0, 0, 0);

    // 渲染器
    const renderer = new THREE.WebGLRenderer();
    // 渲染器大小
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 渲染器添加到 div 中
    divRef.current?.appendChild(renderer.domElement);

    // 点光源
    const pointLight = new THREE.PointLight(0xffffff, 1.0);
    // 点光源位置
    pointLight.position.set(0, 0, 100);
    // 点光源添加到场景中
    scene.add(pointLight);

    // 坐标轴辅助线
    const axesHelper = new THREE.AxesHelper(150);
    // 坐标轴辅助线添加到场景中
    scene.add(axesHelper);
    // 渲染场景
    renderer.render(scene, camera);

    // 点光源辅助线
    const pointLightHelper = new THREE.PointLightHelper(pointLight, 10);
    // 点光源辅助线添加到场景中
    scene.add(pointLightHelper);
    // 渲染场景
    renderer.render(scene, camera);

    pointLight.position.set(100, 60, 50);
    // 改变点光源位置，使用OrbitControls辅助观察
    pointLight.position.set(-400, -200, -300);
    // 点光源辅助线添加到场景中
    scene.add(pointLightHelper);

    // OrbitControls
    // 1. 创建 OrbitControls 实例
    const controls = new OrbitControls(camera, renderer.domElement);
    // 2. 更新 OrbitControls 实例
    // 3. 渲染场景
    controls.update();
    // 渲染场景
    renderer.render(scene, camera);

    controls.addEventListener("change", function () {
      renderer.render(scene, camera); //执行渲染操作
    }); //监听鼠标、键盘事件
  }

  return <div ref={divRef} className="w-full h-full"></div>;
}
