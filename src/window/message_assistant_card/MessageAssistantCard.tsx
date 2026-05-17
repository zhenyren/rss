import { useMessageAssistantCardWindow } from "../../hooks/useMessageAssistantCardWindow";
import { useUserStore } from "../../store/useUserStore";
import "./MessageAssistantCard.css";

export default function MessageAssistantCard() {
  const { user } = useUserStore();

  const onHideClick = () => {
    useMessageAssistantCardWindow().hide();
  };

  return (
    <div
      className="w-screen h-screen bg-white text-white p-4"
      data-tauri-drag-region
    >
      <h1 className="text-2xl font-bold " data-tauri-drag-region>
        Hello, world!!
      </h1>
      <button onClick={onHideClick}>隐藏</button>
      <p>当前名字：{user.name}</p>
    </div>
  );
}
