import logger from "@/common/logger";
import { useMessageAssistantCardWindow } from "@/hooks/useMessageAssistantCardWindow";
import { useUserStore } from "@/store/useUserStore";
import { useState } from "react";

export default function HomeView() {
  const { user, updateName } = useUserStore();
  const messageAssistantCardWindow = useMessageAssistantCardWindow();

  const [textVal, setTextVal] = useState<string>("");
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div>
        <p>Home View</p>
        <div className="flex items-center gap-12px py-24px">
          <button onClick={() => logger.i("Hello, world!")}>Log</button>
          <button onClick={messageAssistantCardWindow.open}>
            打开设置窗口
          </button>
          <button onClick={messageAssistantCardWindow.hide}>
            关闭设置窗口
          </button>
        </div>
        <p>当前名字：{user.name}</p>
        <input
          type="text"
          value={textVal}
          onChange={(e) => setTextVal(e.target.value)}
        />
        <button onClick={() => updateName(textVal)}>设置名字</button>
      </div>
    </div>
  );
}
