import AppTitleBar from "@/components/layouts/AppTitleBar";
import "./App.css";
import { routes } from "@/shared/router/routes";
import { useRoutes, BrowserRouter, useNavigate } from "react-router-dom";
import { GoRouter } from "@/shared/router/GoRouter";
import { AppTitleBarUtils } from "@/components/layouts/utils/AppTitleBarUtils";

function AppRoutes() {
  const outlet = useRoutes(routes);
  GoRouter.init(useNavigate());
  return (
    <div className="w-100vw min-h-100vh flex flex-col">
      <AppTitleBar />
      {/* 主内容区域：高级灰背景 */}
      <div
        className="w-100% bg-gray-50"
        style={{
          height: `calc(100vh - ${AppTitleBarUtils.iPx})`,
        }}
      >
        {outlet}
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
