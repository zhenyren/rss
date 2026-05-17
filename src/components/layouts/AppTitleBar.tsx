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
      className="w-full  flex items-center gap-4 px-4 select-none bg-white"
      data-tauri-drag-region
    >
      <h1 className="select-none">Welcome to Tauri + React</h1>
      <div className="flex-1"></div>
      <div className="flex items-center gap-4">
        <div onClick={minimize}>
          <FontAwesomeIcon
            icon={faMinus}
            className="text-blueGray"
          ></FontAwesomeIcon>
        </div>
        <div onClick={toggleMaximize}>
          {isMaximized ? (
            <FontAwesomeIcon icon={faWindowRestore} className="text-blueGray" />
          ) : (
            <FontAwesomeIcon icon={faSquare} className="text-blueGray" />
          )}
        </div>
        <div onClick={close}>
          <FontAwesomeIcon
            icon={faXmark}
            className="text-blueGray"
          ></FontAwesomeIcon>
        </div>
      </div>
    </div>
  );
}
