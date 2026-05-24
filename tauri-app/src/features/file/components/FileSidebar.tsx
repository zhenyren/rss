import { AppTitleBarUtils } from "@/components/layouts/utils/AppTitleBarUtils";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@radix-ui/themes";
import { useFileOperations } from "../hooks/useFileOperations";
import { useFileStore } from "../store/useFileStore";

interface SideItem {
  name: string;
  path: string;
}

export default function FileSidebar() {
  const { selectFile, readFile } = useFileOperations();
  const update = useFileStore((state) => state.update);

  const sides: SideItem[] = [
    {
      name: "文件",
      path: "",
    },
    {
      name: "文件夹",
      path: "",
    },
  ];

  const onClickEllipsis = async () => {
    console.log("click ellipsis");
    const filePath = await selectFile();
    if (filePath && typeof filePath === "string") {
      const text = await readFile(filePath);
      if (text !== null) {
        update("content", text);
      }
    }
  };

  return (
    <div
      className="w-75 bg-gray-100/90 backdrop-blur-sm pos-fixed left-0 flex flex-col items-end justify-end border-r border-gray-200"
      style={{
        top: AppTitleBarUtils.i,
        height: `calc(100vh - ${AppTitleBarUtils.iPx})`,
      }}
    >
      <div className="w-full h-40px bg-red flex items-center px-4">
        <div className="flex-1"></div>
        <div className="cursor-pointer" onClick={onClickEllipsis}>
          <FontAwesomeIcon icon={faEllipsis} />
        </div>
      </div>
      <_FileSidebarItem item={sides[0]} />
      <_FileSidebarItem item={sides[1]} />
      <div className="flex-1"></div>
    </div>
  );
}

function _FileSidebarItem(props: { item: SideItem }) {
  return (
    <div className="w-full px-3 py-1.5">
      <div className="h-10 flex items-center justify-center rounded-md bg-gray-200/70 text-gray-700 font-medium hover:bg-gray-300/80 transition-all duration-200 cursor-default">
        {props.item.name}
      </div>
    </div>
  );
}
