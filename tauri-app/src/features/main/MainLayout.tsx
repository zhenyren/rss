import { RoutePath } from "@/common/router/route_path";
import AppTitleBar from "@/components/layouts/AppTitleBar";
import HomeView from "@/views/HomeView";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

export default function MainLayout() {
  return (
    <div>
      <Router>
        <AppTitleBar />
        <Routes>
          <Route path={RoutePath.Main} element={<HomeView />} />
        </Routes>
      </Router>
    </div>
  );
}
