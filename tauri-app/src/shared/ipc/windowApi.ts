import { invoke } from "@tauri-apps/api/core";

export const windowApi = {
  openMessageAssistantCardWindow: {
    open: async () => {
      await invoke("open_message_assistant_card_window");
    },
    hide: async () => {
      await invoke("hide_message_assistant_card_window");
    },
  },
};
