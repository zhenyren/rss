import { LazyStore } from "@tauri-apps/plugin-store";
import { create } from "zustand";
import logger from "../common/logger";
import { emit } from "@tauri-apps/api/event";

interface ArticleStore {
  id: string;
  title: string;
}

const createArticle = (): ArticleStore => {
  return {
    id: "",
    title: "",
  };
};

const tauriStore = new LazyStore("cache.json", {
  autoSave: true,
  defaults: { ...createArticle() },
});

export const useArticleStore = create<ArticleStore>((set) => ({
  id: "",
  title: "",

  initStore: async () => {
    try {
      const cachedId = await tauriStore.get<string>("id");
      const cachedTitle = await tauriStore.get<string>("title");
      set({ id: cachedId ?? "未知", title: cachedTitle ?? "未知" });
    } catch (error) {
      logger.e(`初始化 Store 失败: ${error}`);
    }
  },
  // 业务修改名字：改状态 + 广播 + 存盘
  updateTitle: async <K extends keyof ArticleStore>(
    key: K,
    value: ArticleStore[K],
  ) => {
    try {
      logger.i(`正在修改标题为: ${value}`);

      // 改变当前窗口的内存状态
      set({ [key]: value });

      // 广播给其他窗口
      await emit("sync-zustand-user", { [key]: value });

      // 持久化落盘
      await tauriStore.set(key, value);
    } catch (error) {
      logger.e(error);
    }
  },

  // 接收到跨窗口同步时的静默更新（只改内存，不重复广播，防止死循环）
  _silentUpdate: <K extends keyof ArticleStore>(
    key: K,
    value: ArticleStore[K],
  ) => {
    set({ [key]: value });
  },
}));
