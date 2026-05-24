import { useNavigate } from "react-router-dom";
import { ERoutePath } from "./ERoutePath";

export interface User {
  name: string;
}

export class GoRouter {
  private static navigate: ReturnType<typeof useNavigate>;

  static init(navigateFn: ReturnType<typeof useNavigate>) {
    this.navigate = navigateFn;
  }

  // ---------------------
  // 👇 类型重载（核心）
  // ---------------------
  // Home：必须传第二个参数 User
  static push(path: ERoutePath.Home, user: User): void;
  // 其他路由：不能传参
  static push(path: Exclude<ERoutePath, ERoutePath.Home>): void;
  // 实现签名
  static push(path: ERoutePath, user?: User): void {
    if (path === ERoutePath.Home) {
      if (!user) {
        throw new Error(`导航到 ${ERoutePath.Home} 时必须提供 User 参数`);
      }
      // 你可以把 user 拼到 query 里，或走 state
      this.navigate(path, { state: user });
    } else {
      this.navigate(path);
    }
  }

  static back() {
    this.navigate(-1);
  }
}
