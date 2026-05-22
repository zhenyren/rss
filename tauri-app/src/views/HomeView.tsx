import logger from "@/common/logger";
import { useMessageAssistantCardWindow } from "@/hooks/useMessageAssistantCardWindow";
import { useUserStore } from "@/store/useUserStore";
import { useState } from "react";

export default function HomeView() {
  const { user, updateName } = useUserStore();
  const messageAssistantCardWindow = useMessageAssistantCardWindow();

  const [textVal, setTextVal] = useState<string>("");

  const getApi = async () => {
    console.log("init called");
    try {
      console.log("Sending fetch request...");
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      const data = await response.json();
      logger.i(data);
      console.log("Response data:", data);
    } catch (error) {
      console.error("Error in init:", error);
      if (error instanceof Error) {
        console.error("Error stack:", error.stack);
      }
    }
  };

  const updateApi = async () => {
    console.log("updateApi called");
    try {
      console.log("Sending fetch request...");
      logger.i({ name: textVal });
      const response = await fetch("/api", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: textVal }),
      });

      const data = await response.json();
      logger.i(data);
      console.log("Response data:", data);
    } catch (error) {
      console.error("Error in updateApi:", error);
      if (error instanceof Error) {
        console.error("Error stack:", error.stack);
      }
    }
  };

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
        <button onClick={getApi}>请求数据</button>
        <button onClick={updateApi}>更新数据</button>
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
