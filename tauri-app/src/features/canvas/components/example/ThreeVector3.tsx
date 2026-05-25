import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeVector3() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    // 1. 创建一个 3D 向量 (x, y, z)
    const vector = new THREE.Vector3(2, 2, 2);

    // 2. 基础三件套：场景 + 相机 + 渲染器
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    // 3. 把渲染结果挂载到页面
    containerRef.current.appendChild(renderer.domElement);

    // 4. ✅ 正确：用 ArrowHelper 画出向量（才能看见）
    // 参数：方向向量、起点、颜色、长度
    const arrowHelper = new THREE.ArrowHelper(
      vector.normalize(), // 向量方向（归一化）
      new THREE.Vector3(0, 0, 0), // 从原点开始画
      3, // 箭头长度
      0xff0000, // 红色
    );
    scene.add(arrowHelper);

    // 5. 相机后退一点，才能看到画面
    camera.position.z = 5;

    // 6. 渲染循环
    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();

    const handleResize = () => {
      renderer.setSize(
        containerRef.current?.clientWidth || 0,
        containerRef.current?.clientHeight || 0,
      );
      camera.aspect =
        containerRef.current?.clientWidth ||
        ((0 / containerRef.current?.clientHeight!) as number) ||
        0;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    // 打印向量看看值
    console.log("向量：", vector);
    console.log("向量长度：", vector.length());

    // 清理
    return () => {
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full">
      <h1>Three.js Vector3 向量</h1>
    </div>
  );
}
