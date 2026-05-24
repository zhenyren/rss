import { BaseDirectory, readFile } from "@tauri-apps/plugin-fs";
import {
  checkPathExists,
  openTextOrImageFile,
  openFolderDialog,
} from "../services/fileService";
import logger from "@/shared/utils/logger";
import { useEffect, useRef, useState, useCallback } from "react";
import FileSidebar from "../components/FileSidebar";
import { useFileStore } from "../store/useFileStore";

export default function FileView() {
  const [tempPath, setTempPath] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { state, update } = useFileStore();
  const content = state.content;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  // 光标：第几行、第几列
  const [cursor, setCursor] = useState({ row: 0, col: 0, blink: true });
  const [focused, setFocused] = useState(false);

  const fontSize = 18;
  const lineHeight = 28;
  const paddingX = 15;
  const paddingY = 15;

  // 精准渲染 + 精准光标
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = `${fontSize}px Consolas, monospace`;
    ctx.fillStyle = "#111";

    const lines = content.split("\n");

    // 绘制所有行
    lines.forEach((line, i) => {
      ctx.fillText(line, paddingX, paddingY + fontSize + i * lineHeight);
    });

    // 精准计算光标位置
    if (focused && cursor.blink) {
      const targetLine = lines[cursor.row] || "";
      const textBefore = targetLine.slice(0, cursor.col);
      // 关键：用 measureText 精准宽度，不用固定值
      const x = paddingX + ctx.measureText(textBefore).width;
      const y = paddingY + cursor.row * lineHeight;

      ctx.fillStyle = "#000";
      ctx.fillRect(x, y, 2, fontSize);
    }
  }, [content, cursor, focused]);

  useEffect(() => {
    render();
  }, [render]);

  // 光标闪烁
  useEffect(() => {
    const timer = setInterval(() => {
      setCursor((p) => ({ ...p, blink: !p.blink }));
    }, 500);
    return () => clearInterval(timer);
  }, []);

  // 点击精准定位光标
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setFocused(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left - paddingX;
    const clickY = e.clientY - rect.top - paddingY;

    // 计算行
    const row = Math.max(
      0,
      Math.min(Math.floor(clickY / lineHeight), content.split("\n").length - 1),
    );
    const lines = content.split("\n");
    const line = lines[row] || "";

    // 精准找点击在哪一列
    let col = 0;
    let currentWidth = 0;
    for (let i = 0; i < line.length; i++) {
      const w = ctx.measureText(line[i]).width;
      if (currentWidth + w / 2 > clickX) break;
      currentWidth += w;
      col++;
    }

    setCursor({ row, col, blink: true });
  };

  // 键盘输入
  const handleKeyDown = (e: React.KeyboardEvent<HTMLCanvasElement>) => {
    if (!focused) return;
    e.preventDefault();

    const lines = content.split("\n");
    const { row, col } = cursor;
    if (row < 0 || row >= lines.length) return;
    const line = lines[row];

    // 退格
    if (e.key === "Backspace") {
      if (col > 0) {
        const newLine = line.slice(0, col - 1) + line.slice(col);
        lines[row] = newLine;
        setCursor((p) => ({ ...p, col: p.col - 1 }));
      } else if (row > 0) {
        const prevLine = lines[row - 1];
        const currLine = lines[row];
        lines.splice(row, 1);
        lines[row - 1] = prevLine + currLine;
        setCursor({ row: row - 1, col: prevLine.length, blink: true });
      }
      update("content", lines.join("\n"));
      return;
    }

    // 回车换行
    if (e.key === "Enter") {
      const left = line.slice(0, col);
      const right = line.slice(col);
      lines[row] = left;
      lines.splice(row + 1, 0, right);
      update("content", lines.join("\n"));
      setCursor({ row: row + 1, col: 0, blink: true });
      return;
    }

    // 方向键
    if (e.key === "ArrowLeft") {
      setCursor((p) => ({ ...p, col: Math.max(0, p.col - 1) }));
      return;
    }
    if (e.key === "ArrowRight") {
      setCursor((p) => ({ ...p, col: Math.min(line.length, p.col + 1) }));
      return;
    }
    if (e.key === "ArrowUp") {
      const upRow = Math.max(0, row - 1);
      const upLine = lines[upRow] || "";
      setCursor({ row: upRow, col: Math.min(col, upLine.length), blink: true });
      return;
    }
    if (e.key === "ArrowDown") {
      const downRow = Math.min(lines.length - 1, row + 1);
      const downLine = lines[downRow] || "";
      setCursor({
        row: downRow,
        col: Math.min(col, downLine.length),
        blink: true,
      });
      return;
    }

    // 普通字符
    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
      const newLine = line.slice(0, col) + e.key + line.slice(col);
      lines[row] = newLine;
      update("content", lines.join("\n"));
      setCursor((p) => ({ ...p, col: p.col + 1 }));
    }
  };

  // 打开文件
  const onOpenClick = async () => {
    const selected = await openTextOrImageFile();
    if (!selected) return logger.i("用户取消了选择");

    setTempPath(selected);
    try {
      const fileData = await readFile(selected);
      const text = new TextDecoder().decode(fileData);
      update("content", text);
      setCursor({ row: 0, col: 0, blink: true });
    } catch (err) {
      console.error("读取失败", err);
    }
  };

  const onExistsClick = async () => {
    const _exists = await checkPathExists("", BaseDirectory.AppData);
    console.log(_exists);
  };

  const onOpenFolderClick = async () => {
    const selected = await openFolderDialog();
    if (selected) setTempPath(selected);
  };

  return (
    <div className="w-full h-full flex-1">
      <div className="w-full h-full pos-relative flex">
        <FileSidebar />

        <div className="flex-1 bg-yellow pl-75">
          <h1>文件编辑器</h1>
          <button onClick={onOpenClick}>打开文件</button>
          <button onClick={onOpenFolderClick}>打开文件夹</button>
          <button onClick={onExistsClick}>检查是否存在</button>

          <canvas
            ref={canvasRef}
            width={800}
            height={600}
            tabIndex={0}
            onClick={handleCanvasClick}
            onKeyDown={handleKeyDown}
            style={{
              border: "1px solid #ccc",
              resize: "none",
              outline: focused ? "2px solid #4a90e2" : "none",
              background: "#fff",
              marginTop: 10,
            }}
          />
        </div>
      </div>
    </div>
  );
}
