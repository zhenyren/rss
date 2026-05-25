import { useEffect, useRef } from "react";

export default function CanvasTutorial() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // 2. useEffect：组件挂载后执行（DOM 已存在）
  useEffect(() => {
    // 获取 canvas 上下文
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    ctx.font = "30px Arial";
    ctx.fillText("hello canvas", 50, 50);

    ctx.strokeStyle = "blue";
    ctx.strokeText("hello canvas", 50, 100);

    // const x = 50;
    // const y = 50;
    // const w = 600;
    // const h = 200;
    // const r = 20;

    // ctx.fillStyle = "red";
    // ctx.beginPath();
    // ctx.moveTo(x + r, y);
    // ctx.lineTo(x + w - r, y);
    // ctx.arc(x + w - r, y + r, r, 1.5 * Math.PI, 2 * Math.PI);
    // ctx.lineTo(x + w, y + h - r);
    // ctx.arc(x + w - r, y + h - r, r, 0, 0.5 * Math.PI);
    // ctx.lineTo(x + r, y + h);
    // ctx.arc(x + r, y + h - r, r, 0.5 * Math.PI, Math.PI);
    // ctx.lineTo(x, y + r);
    // ctx.arc(x + r, y + r, r, Math.PI, 1.5 * Math.PI);
    // ctx.closePath();
    // ctx.fill();
    // 调用绘制函数
    // drawFullRect();
    // drawStrokeRect();
    // drawPath();

    // 清除一个矩形区域
    // ctx.clearRect(10, 10, 100, 100);
  }, []); // 空依赖：只在组件首次挂载时执行一次

  /// 绘制一个填充的矩形
  // function drawFullRect() {
  //   const ctx = canvasRef.current?.getContext("2d");
  //   if (!ctx) return;
  //   ctx.fillStyle = "red";
  //   ctx.fillRect(0, 0, 100, 100);
  // }

  // /// 绘制一个矩形的边框
  // function drawStrokeRect() {
  //   const ctx = canvasRef.current?.getContext("2d");
  //   if (!ctx) return;
  //   ctx.strokeStyle = "blue";
  //   ctx.strokeRect(200, 200, 100, 100);
  // }

  // 绘制路径
  // function drawPath() {
  //   const ctx = canvasRef.current?.getContext("2d");
  //   if (!ctx) return;
  //   ctx.beginPath();
  //   // 圆心(x,y)，半径r，起始角，结束角，默认顺时针false
  //   ctx.arc(250, 250, 20, 0, Math.PI * 2);
  //   // ctx.fill(); // 填充
  //   ctx.stroke(); // 描边
  // }

  return (
    <canvas ref={canvasRef} width="800" height="600">
      11111
    </canvas>
  );
}
