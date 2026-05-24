import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppWindow } from "../../shared/hooks/useAppWindow";
import {
  faMinus,
  faSquare,
  faWindowRestore,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { GoRouter } from "@/shared/router/GoRouter";
import { ERoutePath } from "@/shared/router/ERoutePath";
import { AppTitleBarUtils } from "./utils/AppTitleBarUtils";

export default function AppTitleBar() {
  const { minimize, toggleMaximize, close, isMaximized } = useAppWindow();

  const onClickFile = () => {
    GoRouter.push(ERoutePath.File);
  };
  const onClickHome = () => {
    GoRouter.push(ERoutePath.Home, {
      name: "",
    });
  };

  return (
    <div
      data-tauri-drag-region
      // 顶部栏：统一高级灰背景
      className={`w-full flex items-center px-4 select-none bg-gray-200/90 border-b border-gray-300`}
      style={AppTitleBarUtils.style}
    >
      {/* 左侧标题 */}
      <h1 className="text-sm font-medium text-gray-700 tracking-wide">
        Tauri Rs React
      </h1>
      <div className="flex items-center gap-2 ml-4">
        <div
          onClick={onClickHome}
          className="px-3 py-1 text-sm text-gray-700 rounded-md hover:bg-gray-200/80 cursor-pointer transition-all"
        >
          主页
        </div>
        <div
          onClick={onClickFile}
          className="px-3 py-1 text-sm text-gray-700 rounded-md hover:bg-gray-200/80 cursor-pointer transition-all"
        >
          文件
        </div>
      </div>

      {/* 中间占位（让按钮靠右） */}
      <div className="flex-1"></div>

      {/* 窗口控制按钮 */}
      <div className="flex items-center gap-1 h-full">
        {/* 最小化 */}
        <div
          onClick={minimize}
          className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-gray-200/80 transition-colors cursor-pointer"
        >
          <FontAwesomeIcon icon={faMinus} className="text-gray-600 text-xs" />
        </div>

        {/* 最大化 / 还原 */}
        <div
          onClick={toggleMaximize}
          className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-gray-200/80 transition-colors cursor-pointer"
        >
          <FontAwesomeIcon
            icon={isMaximized ? faWindowRestore : faSquare}
            className="text-gray-600 text-xs"
          />
        </div>

        {/* 关闭（红色保留系统习惯） */}
        <div
          onClick={close}
          className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-red-500 transition-colors cursor-pointer"
        >
          <FontAwesomeIcon
            icon={faXmark}
            className="text-gray-600 hover:text-white text-xs transition-colors"
          />
        </div>
      </div>
    </div>
  );
}
