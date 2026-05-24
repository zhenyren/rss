import { info, warn, error, debug } from "@tauri-apps/plugin-log";

export const logModule = {
  i: (msg: string) => info(msg).catch(() => {}),
  w: (msg: string) => warn(msg).catch(() => {}),
  e: (msg: string) => error(msg).catch(() => {}),
  d: (msg: string) => debug(msg).catch(() => {}),
};

export const systemApi = {
  log: logModule,
};
