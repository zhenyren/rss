import MainLayout from "@/components/layouts/MainLayout";
import FileView from "@/features/file/views/FileView";
import HomeView from "@/features/home/HomeView";
import { Navigate, RouteObject } from "react-router-dom";
import { ERoutePath } from "./ERoutePath";

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
    path: ERoutePath.File,
    element: <FileView />,
  },
];
