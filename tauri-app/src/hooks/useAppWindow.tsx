import { getCurrentWindow } from "@tauri-apps/api/window";
import { useEffect, useState } from "react";
import logger from "../common/logger";

export const useAppWindow = () => {
  // 获取当前窗口
  const appWindow = getCurrentWindow();
  const [isMaximized, setIsMaximized] = useState(false);

  // 窗口控制
  const minimize = async () => {
    try {
      logger.i("Minimized");
      await appWindow.minimize();
    } catch (error) {
      logger.e(error as string);
    }
  };

  // 检查窗口最大化状态
  const checkMaximized = async () => {
    const maximized = await appWindow.isMaximized();
    setIsMaximized(maximized);
  };

  const toggleMaximize = async () => {
    try {
      logger.i("Toggled Maximize");
      await appWindow.toggleMaximize();
      // 切换后更新状态
      await checkMaximized();
    } catch (error) {
      logger.e(error as string);
    }
  };

  const close = async () => {
    try {
      await appWindow.close();
      logger.i("Closed");
    } catch (error) {
      logger.e(error as string);
    }
  };

  useEffect(() => {
    checkMaximized();
  }, []);

  return {
    minimize,
    toggleMaximize,
    close,
    isMaximized,
    checkMaximized,
    setIsMaximized,
  };
};
