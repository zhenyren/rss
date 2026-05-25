import MainLayout from "@/components/layouts/MainLayout";
import FileView from "@/features/file/views/FileView";
import HomeView from "@/features/home/HomeView";
import { Navigate, RouteObject } from "react-router-dom";
import { ERoutePath } from "./ERoutePath";
import CanvasView from "@/features/canvas/views/CanvasVIew";
import ThreeLayout from "@/features/canvas/ThreeLayout";
import PanoramicView from "@/features/canvas/views/PanoramicView";
import HouseHuntingView from "@/features/canvas/views/HouseHuntingView";
import Three3DMapView from "@/features/canvas/views/Three3DMapView";

export const routes: RouteObject[] = [
  {
    path: "",
    element: <Navigate to={ERoutePath.Home} replace />,
  },
  {
    path: ERoutePath.MainLayout,
    element: <MainLayout />,
    children: [
      {
        path: ERoutePath.Home,
        element: <HomeView />,
      },
    ],
  },
  {
    path: ERoutePath.ThreeLayout,
    element: <ThreeLayout />,
    children: [
      {
        path: ERoutePath.ThreeLayout,
        element: <CanvasView />,
      },
      // 全景图
      {
        path: ERoutePath.ThreeLayout,
        element: <PanoramicView />,
      },
    ],
  },
  {
    path: ERoutePath.HouseHunting,
    element: <HouseHuntingView />,
  },
  // 全景查看
  {
    path: ERoutePath.PanoramicViewing,
    element: <PanoramicView />,
  },
  {
    path: ERoutePath.Three3DMap,
    element: <Three3DMapView />,
  },
  {
    path: ERoutePath.File,
    element: <FileView />,
  },
];
