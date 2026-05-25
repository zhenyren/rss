import { useEffect, useRef } from "react";
import * as THREE from "three";
import GUI from "three/addons/libs/lil-gui.module.min.js";

export default function ThreeGuiScene() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const guiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvasBox = canvasRef.current;
    const guiBox = guiRef.current;
    if (!canvasBox || !guiBox) return;

    // 场景初始化
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a1a);

    const camera = new THREE.PerspectiveCamera(
      30,
      canvasBox.clientWidth / canvasBox.clientHeight,
      1,
      10000,
    );
    camera.position.set(2000, 1500, 2000);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(canvasBox.clientWidth, canvasBox.clientHeight);
    canvasBox.appendChild(renderer.domElement);

    // 控制参数
    const params = {
      count: 10,
      size: 50,
      space: 120,
      color: "#00ffff",
      opacity: 0.5,
      rotate: true,
    };

    let cubeList: THREE.Mesh[] = [];
    let geometry: THREE.BoxGeometry | null = null;
    let material: THREE.MeshBasicMaterial | null = null;

    // 创建立方体阵列
    function createCubeArray() {
      cubeList.forEach((cube) => scene.remove(cube));
      cubeList = [];
      geometry?.dispose();
      material?.dispose();

      geometry = new THREE.BoxGeometry(params.size, params.size, params.size);
      material = new THREE.MeshBasicMaterial({
        color: params.color,
        transparent: true,
        opacity: params.opacity,
      });

      const offset = (params.count * params.space) / 2;
      for (let i = 0; i < params.count; i++) {
        for (let j = 0; j < params.count; j++) {
          const mesh = new THREE.Mesh(geometry, material);
          mesh.position.set(
            i * params.space - offset,
            0,
            j * params.space - offset,
          );
          scene.add(mesh);
          cubeList.push(mesh);
        }
      }
    }
    createCubeArray();

    // 挂载GUI到指定容器，面板可见
    const gui = new GUI({ container: guiBox });
    gui.domElement.style.position = "absolute";
    gui.domElement.style.top = "20px";
    gui.domElement.style.right = "20px";

    gui.add(params, "count", 5, 20, 1).name("阵列数").onChange(createCubeArray);
    gui.add(params, "size", 10, 100).name("方块大小").onChange(createCubeArray);
    gui
      .add(params, "space", 50, 300)
      .name("间隔距离")
      .onChange(createCubeArray);
    gui.addColor(params, "color").name("方块颜色").onChange(createCubeArray);
    gui.add(params, "opacity", 0.1, 1).name("透明度").onChange(createCubeArray);
    gui.add(params, "rotate").name("开启旋转");

    // 动画循环
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      if (params.rotate) {
        cubeList.forEach((item) => {
          item.rotation.x += 0.005;
          item.rotation.y += 0.005;
        });
      }
      renderer.render(scene, camera);
    };
    animate();

    // 资源销毁
    return () => {
      cancelAnimationFrame(animationId);
      gui.destroy();
      cubeList.forEach((cube) => scene.remove(cube));
      geometry?.dispose();
      material?.dispose();
      renderer.dispose();
      canvasBox.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <div ref={canvasRef} className="w-full h-full"></div>
      {/* GUI面板容器 */}
      <div ref={guiRef}></div>
    </div>
  );
}
