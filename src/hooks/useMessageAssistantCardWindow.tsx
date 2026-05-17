import { windowApi } from "../ipc/windowApi";
import logger from "../common/logger";

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
