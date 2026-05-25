import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import img from "@/assets/rogland_clear_night.jpg";

export default function PanoramicViewing() {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!divRef.current) {
      return;
    }
    // 1. 创建场景 (Scene)
    const scene = new THREE.Scene();

    // 2. 创建相机 (Camera)
    // 视角(FOV)设为 75 度，把相机放在原点 (0, 0, 0)
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.set(0, 0, 0);

    // 3. 创建渲染器 (Renderer) 并添加到页面
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    divRef.current.appendChild(renderer.domElement);

    // 4. 添加鼠标控制器 (OrbitControls)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // 开启阻尼感（让旋转更平滑）
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.minDistance = 1;
    controls.maxDistance = 100;

    // 5. 创建全景球体 (关键步骤！)
    // 创建一个半径为 500 的大球体
    const geometry = new THREE.SphereGeometry(500, 60, 40);

    // 【避坑核心】翻转球体的几何面，让材质贴在球体内壁，而不是外表
    geometry.scale(-1, 1, 1);

    // 6. 加载全景图片
    const textureLoader = new THREE.TextureLoader();
    // 这里使用的是一张公共的客厅全景测试图（2:1 比例的等距柱状投影图）
    const panoramaUrl = img;

    const material = new THREE.MeshBasicMaterial({
      map: textureLoader.load(panoramaUrl),
    });

    // 7. 生成网格并组合放入场景
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // 8. 动画渲染循环
    function animate() {
      requestAnimationFrame(animate);
      controls.update(); // 只有开启阻尼时才需要每次更新
      renderer.render(scene, camera);
    }
    animate();

    // 9. 监听窗口大小改变，自适应屏幕
    window.addEventListener("resize", onWindowResize, false);
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }, [divRef]);

  return (
    <div ref={divRef} className="w-full h-full overflow-hidden bg-black" />
  );
}
