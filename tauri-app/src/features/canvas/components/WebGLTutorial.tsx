import { useRef, useEffect } from "react";

export default function WebGLTutorial() {
  // 1. 创建 canvas 引用
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const gl = canvasRef.current.getContext("webgl");
    if (!gl) {
      return;
    }

    // 2. 初始化 WebGL
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }, []);

  // 3. 必须返回 canvas DOM
  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      style={{ border: "1px solid #000" }}
    />
  );
}
