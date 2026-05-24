import { useMessageAssistantCardWindow } from "../../shared/hooks/useMessageAssistantCardWindow";
import { useUserStore } from "../../shared/store/useUserStore";
import "./MessageAssistantCard.css";

export default function MessageAssistantCard() {
  const { user } = useUserStore();

  const onHideClick = () => {
    useMessageAssistantCardWindow().hide();
  };

  return (
    <div className="w-screen h-screen bg-white  p-4" data-tauri-drag-region>
      <h1 className="text-2xl font-bold " data-tauri-drag-region>
        Hello, world!!
      </h1>
      <button className="px-12px py-12px " onClick={onHideClick}>
        隐藏
      </button>
      <p className="">当前名字：{user.name}</p>
    </div>
  );
}
