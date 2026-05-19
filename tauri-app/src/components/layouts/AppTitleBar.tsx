import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppWindow } from "../../hooks/useAppWindow";
import {
  faMinus,
  faSquare,
  faWindowRestore,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

export default function AppTitleBar() {
  const { minimize, toggleMaximize, close, isMaximized } = useAppWindow();

  return (
    <div
      data-tauri-drag-region
      className="w-full h-9 flex items-center px-4 select-none bg-[#f8f9fc] border-b border-gray-200"
    >
      {/* 左侧标题 */}
      <h1 className="text-sm font-medium text-gray-700 tracking-wide">
        Tauri Rs React
      </h1>

      {/* 中间占位（让按钮靠右） */}
      <div className="flex-1" />

      {/* 窗口控制按钮 */}
      <div className="flex items-center gap-1 h-full">
        {/* 最小化 */}
        <div
          onClick={minimize}
          className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-gray-200 transition-colors cursor-pointer"
        >
          <FontAwesomeIcon icon={faMinus} className="text-gray-600 text-xs" />
        </div>

        {/* 最大化 / 还原 */}
        <div
          onClick={toggleMaximize}
          className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-gray-200 transition-colors cursor-pointer"
        >
          <FontAwesomeIcon
            icon={isMaximized ? faWindowRestore : faSquare}
            className="text-gray-600 text-xs"
          />
        </div>

        {/* 关闭（红色高亮） */}
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
