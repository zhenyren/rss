import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function ThreeBufferGeometry() {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = divRef.current;
    if (!container) return;

    // 场景
    const scene = new THREE.Scene();

    // 相机
    const camera = new THREE.PerspectiveCamera(
      30,
      container.clientWidth / container.clientHeight,
      1,
      5000,
    );
    camera.position.set(0, 0, 300);
    camera.lookAt(0, 0, 0);

    // 渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // 创建几何体
    const geometry = new THREE.BufferGeometry();
    // const vertices = new Float32Array([
    //   -50, -30, -20, 50, -30, -20, 50, 30, -20, -50, 30, -20, -50, -30, 20, 50,
    //   -30, 20, 50, 30, 20, -50, 30, 20,
    // ]);
    const vertices = new Float32Array([0, 0, 0, 0, 10, 0, 10, 10, 0, 10, 0, 0]);

    geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
    // 关键：补上第二个三角形
    const indices = new Uint16Array([
      0,
      1,
      2, // 左上三角
      0,
      2,
      3, // 右下三角
    ]);
    geometry.setIndex(new THREE.BufferAttribute(indices, 1));

    // 材质
    const material = new THREE.MeshLambertMaterial({
      color: "red",
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide, // 双面可见
    });

    // 网格
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // 线材质对象
    const edges = new THREE.EdgesGeometry(geometry);
    const line = new THREE.LineSegments(
      edges,
      new THREE.LineBasicMaterial({ color: 0xff0000 }),
    );
    scene.add(line);

    const light = new THREE.AmbientLight(0xffffff, 1.5);
    light.position.set(1000, 0, 0);
    scene.add(light);

    geometry.scale(2, 2, 2);
    geometry.translate(50, 0, 0);
    // 渲染
    renderer.render(scene, camera);

    // 轨道控制器
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    // const axisHelper = new THREE.AxesHelper(100);
    // scene.add(axisHelper);

    // 渲染循环
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // 清理
    return () => {
      container.removeChild(renderer.domElement);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return <div ref={divRef} className="w-full h-full" />;
}
