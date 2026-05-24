// 引入 LazyStore
import { LazyStore } from "@tauri-apps/plugin-store";
import { useEffect, useState } from "react";
import logger from "@/shared/utils/logger";
import { emit, listen } from "@tauri-apps/api/event";

interface User {
  name: string;
}

const createUser = (): User => {
  return {
    name: "",
  };
};

// 在 Hook 外部或者内部用全局单例的方式声明（外部声明可以跨组件共享）
const store = new LazyStore("cache.json", {
  autoSave: true,
  defaults: { ...createUser() },
});

export const useUserStore = () => {
  let [user, setUser] = useState<User>(createUser());

  const init = async () => {
    // 第一次 get 时，LazyStore 会在底层自动初始化 cache.json
    const name = await store.get<string>("name");
    setUser({
      name: name ?? "未知",
    });
  };

  useEffect(() => {
    init();

    // 2. 核心：监听 "name" 这个键的变化！
    // 不管是主窗口还是后台改了 "name"，这里都会被实时触发
    // let unlisten: () => void;

    // 关键：不再盯着 keyChange，而是监听 Tauri 的全局跨窗口广播 "sync-user-name"
    let unlistenFn: (() => void) | null = null;

    const setupListener = async () => {
      const unlisten = await listen<{ name: string }>(
        "sync-user-name",
        (event) => {
          logger.i(`[收到跨窗口广播] 名字同步更新为: ${event.payload.name}`);
          setUser({ name: event.payload.name });
        },
      );
      unlistenFn = unlisten;
    };
    setupListener();

    return () => {
      if (unlistenFn) unlistenFn();
    };
  }, []);

  const updateName = async (name: string) => {
    try {
      logger.i(`Updating name to ${name}`);
      // 此时 store 绝对不是 undefined
      await store.set("name", name);
      setUser({ name });
      await emit("sync-user-name", { name });
      logger.i(`Updated name to ${name}`);
    } catch (error) {
      logger.e(error);
    }
  };

  return { user, updateName };
};
