import "./App.css";
// import logger from "../../common/logger";
import AppTitleBar from "@/components/layouts/AppTitleBar";
// import { useState } from "react";
// import { useUserStore } from "../../store/useUserStore";
// import { useMessageAssistantCardWindow } from "../../hooks/useMessageAssistantCardWindow";
import HomeView from "@/views/HomeView";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";

function App() {
  // const { user, updateName } = useUserStore();
  // const messageAssistantCardWindow = useMessageAssistantCardWindow();

  // const [textVal, setTextVal] = useState<string>("");

  // 组件挂载时检查窗口状态
  return (
    // 可以拖拽

    <main className="w-screen h-screen overflow-hidden bg-white">
      <Router>
        <AppTitleBar />
        <Routes>
          <Route path="/" element={<HomeView />} />
        </Routes>

        {/* <div className="flex items-center gap-12px py-24px">
        <button onClick={() => logger.i("Hello, world!")}>Log</button>
        <button onClick={messageAssistantCardWindow.open}>打开设置窗口</button>
        <button onClick={messageAssistantCardWindow.hide}>关闭设置窗口</button>
      </div>
      <p>当前名字：{user.name}</p>
      <input
        type="text"
        value={textVal}
        onChange={(e) => setTextVal(e.target.value)}
      />
      <button onClick={() => updateName(textVal)}>设置名字</button> */}
      </Router>
    </main>
  );
}

export default App;
