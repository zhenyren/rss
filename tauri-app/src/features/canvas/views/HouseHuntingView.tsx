import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// 1. 引入你准备好的两张成套全景图
import livingRoomImg from "@/assets/rogland_clear_night.jpg"; // 你之前的星空图（暂代客厅）
// import bedroomImg from "@/assets/bedroom.jpg";           // 解开注释换成你的第二张图

// 2. 配置配置房间的 3D 数据链
const ROOM_DATA = {
  livingRoom: {
    name: "舒适客厅",
    image: livingRoomImg,
    hotspots: [
      {
        id: "to_bedroom",
        targetRoom: "bedroom",
        // 传送门在 3D 空间中的坐标（X, Y, Z）
        // 可以根据你的全景图视野调整这些数值，让它刚好贴在门的位置
        position: new THREE.Vector3(350, -60, 150),
        text: "前往卧室 ➡️",
      },
    ],
  },
  bedroom: {
    name: "温馨卧室",
    image: livingRoomImg, // 暂时也用这张，等你拿到新图替换掉即可
    hotspots: [
      {
        id: "to_livingRoom",
        targetRoom: "livingRoom",
        position: new THREE.Vector3(-350, -60, -150),
        text: "⬅️ 返回客厅",
      },
    ],
  },
};

type RoomKey = keyof typeof ROOM_DATA;

export default function HouseHuntingView() {
  const divRef = useRef<HTMLDivElement>(null);

  // 用 React 状态来控制左上角 UI 文本的显示
  const [roomName, setRoomName] = useState<string>(ROOM_DATA.livingRoom.name);

  // 使用 useRef 存储 3D 变量，防止 React 重新渲染时导致 3D 场景重建
  const stateRef = useRef({
    currentRoom: "livingRoom" as RoomKey,
    scene: null as THREE.Scene | null,
    sphereMaterial: null as THREE.MeshBasicMaterial | null,
    textureLoader: new THREE.TextureLoader(),
    hotspotMeshes: [] as THREE.Mesh[],
  });

  useEffect(() => {
    if (!divRef.current) return;

    const width = divRef.current.clientWidth;
    const height = divRef.current.clientHeight;

    // 1. 初始化场景 (Scene)
    const scene = new THREE.Scene();
    stateRef.current.scene = scene;

    // 2. 初始化相机 (Camera)
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 0, 0); // 相机死守原点

    // 3. 初始化渲染器 (Renderer)
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    divRef.current.appendChild(renderer.domElement);

    // 4. 初始化鼠标控制器 (OrbitControls)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.minDistance = 1;
    controls.maxDistance = 100;

    // 5. 创建全景大球体（衣服反穿）
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1); // 翻转 X 轴，材质贴到球内壁

    // 6. 加载初始房间纹理
    const initialRoom = ROOM_DATA[stateRef.current.currentRoom];
    const sphereMaterial = new THREE.MeshBasicMaterial({
      map: stateRef.current.textureLoader.load(initialRoom.image),
    });
    stateRef.current.sphereMaterial = sphereMaterial;

    const sphere = new THREE.Mesh(geometry, sphereMaterial);
    scene.add(sphere);

    // 7. 函数：动态渲染当前房间的“传送门”
    const renderHotspots = () => {
      // 清除旧房间残留的传送门物体
      stateRef.current.hotspotMeshes.forEach((mesh) => scene.remove(mesh));
      stateRef.current.hotspotMeshes = [];

      // 获取当前房间的数据
      const currentRoomInfo = ROOM_DATA[stateRef.current.currentRoom];

      currentRoomInfo.hotspots.forEach((hotspot) => {
        // 创建一个圆盘作为传送门图标
        const circleGeo = new THREE.CircleGeometry(25, 32);
        const circleMat = new THREE.MeshBasicMaterial({
          color: 0x00ffcc, // 亮眼的科技青色
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.7,
        });
        const hotspotMesh = new THREE.Mesh(circleGeo, circleMat);

        // 设置它在 3D 世界的位置，并让它永远“正脸”对着相机
        hotspotMesh.position.copy(hotspot.position);
        hotspotMesh.lookAt(0, 0, 0);

        // 【关键点】把目标房间的 key 悄悄藏在物体的 userData 里，点击时读取
        hotspotMesh.userData = { targetRoom: hotspot.targetRoom };

        scene.add(hotspotMesh);
        stateRef.current.hotspotMeshes.push(hotspotMesh);
      });
    };

    // 初始化调用，画出第一个房间的门
    renderHotspots();

    // 8. 射线检测（Raycaster）—— 捕获鼠标点击了哪扇门
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onPointerDown = (event: PointerEvent) => {
      if (!divRef.current) return;

      // 将鼠标点击的绝对像素坐标，转换为 3D 世界统一的 NDC 坐标 (-1 到 1)
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      // 发射隐形激光束
      raycaster.setFromCamera(mouse, camera);

      // 检测这束光碰到了哪些传送门
      const intersects = raycaster.intersectObjects(
        stateRef.current.hotspotMeshes,
      );

      if (intersects.length > 0) {
        // 碰到了！拿到第一个被射中的门
        const clickedTarget = intersects[0].object;
        const nextRoomKey = clickedTarget.userData.targetRoom as RoomKey;

        // 执行切换逻辑
        stateRef.current.currentRoom = nextRoomKey;
        setRoomName(ROOM_DATA[nextRoomKey].name); // 更新 React UI 文本

        // 更换球壁上的贴图
        if (stateRef.current.sphereMaterial) {
          stateRef.current.sphereMaterial.map =
            stateRef.current.textureLoader.load(ROOM_DATA[nextRoomKey].image);
          stateRef.current.sphereMaterial.needsUpdate = true; // 告知 Three.js 刷新贴图
        }

        // 重新刷新新房间的传送门位置
        renderHotspots();
      }
    };

    // 绑定点击事件
    renderer.domElement.addEventListener("pointerdown", onPointerDown);

    // 9. 动画渲染循环
    let animationFrameId: number;
    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    // 10. 视口自适应
    const onWindowResize = () => {
      if (!divRef.current) return;
      const w = divRef.current.clientWidth;
      const h = divRef.current.clientHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onWindowResize);

    // 11. 严格的销毁函数，防止组件热更新内存爆炸
    return () => {
      window.removeEventListener("resize", onWindowResize);
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      cancelAnimationFrame(animationFrameId);
      controls.dispose();
      geometry.dispose();
      sphereMaterial.dispose();
      stateRef.current.hotspotMeshes.forEach((mesh) => scene.remove(mesh));

      if (divRef.current && renderer.domElement) {
        divRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      {/* Three.js 画布挂载点 */}
      <div ref={divRef} className="w-full h-full" />

      {/* 左上角房间名字浮层 UI */}
      <div className="absolute top-5 left-5 bg-black/70 text-white px-4 py-2 rounded-lg pointer-events-none backdrop-blur-md border border-white/10 shadow-lg">
        <div className="text-xs text-gray-400">当前位置</div>
        <div className="text-lg font-bold tracking-wide">{roomName}</div>
      </div>

      {/* 底部操作指南 */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-black/50 text-white/80 px-4 py-1.5 rounded-full text-xs pointer-events-none tracking-wider backdrop-blur-sm">
        💡 按住鼠标左键拖拽旋转视角 | 寻找场景中的【青色圆盘】点击传送
      </div>
    </div>
  );
}
