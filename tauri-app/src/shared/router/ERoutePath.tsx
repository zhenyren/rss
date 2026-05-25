export enum ERoutePath {
  MainLayout = "/*",
  Home = "home",
  File = "/file",

  // --- 3D场景 ---
  ThreeLayout = "/three", // 3D场景布局
  HouseHunting = "/house-hunting", // 3d看房场景
  PanoramicViewing = "/panoramic-viewing", // 3d全景查看场景
  Three3DMap = "/three-3d-map", // 3d地图场景
}

export type OtherRoutePath = Exclude<ERoutePath, ERoutePath.Home>;
