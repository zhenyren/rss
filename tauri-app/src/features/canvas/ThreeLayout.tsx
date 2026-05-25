import { ERoutePath } from "@/shared/router/ERoutePath";
import { GoRouter } from "@/shared/router/GoRouter";

export default function ThreeLayout() {
  const onClickHouseHuntingClick = () => {
    GoRouter.push(ERoutePath.HouseHunting);
  };
  const onClickPanoramicViewingClick = () => {
    GoRouter.push(ERoutePath.PanoramicViewing);
  };
  const onClickThree3DMapClick = () => {
    GoRouter.push(ERoutePath.Three3DMap);
  };
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {/* 看房 */}
      <button onClick={onClickHouseHuntingClick}>看房</button>
      {/* 全景查看 */}
      <button onClick={onClickPanoramicViewingClick}>全景查看</button>
      {/* 地图3d地图 */}
      <button onClick={onClickThree3DMapClick}>地图3d</button>
    </div>
  );
}
