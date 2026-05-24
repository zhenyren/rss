import logger from "@/shared/utils/logger";
import { emit } from "@tauri-apps/api/event";
import { LazyStore } from "@tauri-apps/plugin-store";
import { create } from "zustand";

interface Store<State = Object> {
  update: <K extends keyof State>(key: K, value: State[K]) => void;
  state: State;
}

export function defineStore<State>(key: string, { state }: { state: State }) {
  const _lazyStore = new LazyStore(`${key}.json`, {
    autoSave: true,
    defaults: { state },
  });

  const useStore = create<Store<State>>((set) => {
    // 从持久化存储中恢复状态
    const loadPersistedState = async () => {
      try {
        const persistedState: Partial<State> = {};
        for (const k of Object.keys(state as object) as Array<keyof State>) {
          const value = await _lazyStore.get<State[typeof k]>(String(k));
          if (value !== undefined && value !== null) {
            persistedState[k] = value;
          }
        }

        // 合并持久化的值到初始状态
        if (Object.keys(persistedState).length > 0) {
          set((prev) => ({
            ...prev,
            state: { ...prev.state, ...persistedState },
          }));
          logger.i(
            `Loaded persisted state for ${key}: ${JSON.stringify(persistedState)}`,
          );
        }
      } catch (error) {
        logger.e(`Failed to load persisted state for ${key}: ${error}`);
      }
    };

    // 初始化时加载持久化数据
    loadPersistedState();

    return {
      state: state,
      update: async <K extends keyof State>(k: K, value: State[K]) => {
        try {
          const stateKey = String(k as string);
          logger.i(`update key=${stateKey} to value=${value}`);
          set((prev) => {
            logger.i(
              `prev state=${JSON.stringify(prev.state)},old ${stateKey}=${prev.state[k]} -> new ${stateKey}=${value}`,
            );
            return { ...prev, state: { ...prev.state, [stateKey]: value } };
          });

          await emit(`${stateKey}_update`, { [stateKey]: value });
          await _lazyStore.set(stateKey, value);
          await _lazyStore.save();
        } catch (error) {
          logger.e(`update key=${String(k)} to value=${value} error=${error}`);
        }
      },
    };
  });

  return useStore;
}
