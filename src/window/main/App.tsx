import "./App.css";
import AppTitleBar from "@/components/layouts/AppTitleBar";
import HomeView from "@/views/HomeView";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <main className="w-screen h-screen overflow-hidden bg-white">
      <Router>
        <AppTitleBar />
        <Routes>
          <Route path="/" element={<HomeView />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
