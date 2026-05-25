import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeArrayCube() {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = divRef.current;
    if (!container) return;

    // 场景
    const scene = new THREE.Scene();

    // 几何体（缩小一点，阵列更紧凑好看）
    const geometry = new THREE.BoxGeometry(50, 50, 50);

    // 半透明材质
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.5,
    });

    // 10×10 阵列立方体
    const cubeList: THREE.Mesh[] = []; // 存起来统一旋转
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(i * 120, 0, j * 120); // 间距 120
        scene.add(mesh);
        cubeList.push(mesh);
      }
    }

    // 相机（正确位置，能看到整个阵列）
    const camera = new THREE.PerspectiveCamera(
      30,
      container.clientWidth / container.clientHeight,
      1,
      5000,
    );
    // 关键：删掉了覆盖 camera.position.z = 5 的错误代码
    camera.position.set(1500, 1500, 1000); // 远距离观察阵列
    camera.lookAt(500, 0, 500); // 看向阵列中心

    // 渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // 动画循环：整个阵列一起旋转
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      cubeList.forEach((cube) => {
        cube.rotation.x += 0.008;
        cube.rotation.y += 0.008;
      });

      renderer.render(scene, camera);
    };
    animate();

    // 清理
    return () => {
      cancelAnimationFrame(animationId);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={divRef} className="w-full h-full" />;
}
