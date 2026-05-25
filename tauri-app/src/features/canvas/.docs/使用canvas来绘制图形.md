# 绘制矩形

**不同于 SVG，<canvas> 只支持两种形式的图形绘制：矩形和路径（由一系列点连成的线段）。所有其他类型的图形都是通过一条或者多条路径组合而成的。**


## canvas 提供了三种方法绘制矩形：

1. `fillRect`：填充矩形
```ts
ctx.fillStyle = "red";
ctx.fillRect(0, 0, 100, 100);
`````
2. `strokeRect`：绘制矩形的边框
```ts
ctx.strokeStyle = "blue";
ctx.stroke(0, 0, 100, 100);
`````
3. `clearRect`：清除矩形区域
```ts
ctx.clearRect(0, 0, 100, 100);
`````

## 绘制路径
