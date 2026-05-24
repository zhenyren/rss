import { windowApi } from "@/shared/ipc/windowApi";
import logger from "@/shared/utils/logger";

export const useMessageAssistantCardWindow = () => {
  const open = async () => {
    try {
      await windowApi.openMessageAssistantCardWindow.open();
    } catch (error) {
      logger.e(error as string);
    }
  };

  const hide = async () => {
    try {
      await windowApi.openMessageAssistantCardWindow.hide();
    } catch (error) {
      logger.e(error as string);
    }
  };

  return {
    open,
    hide,
  };
};
