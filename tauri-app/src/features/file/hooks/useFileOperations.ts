import { useCallback } from "react";
import { BaseDirectory } from "@tauri-apps/plugin-fs";
import {
  checkPathExists,
  openFileDialog,
  openTextOrImageFile,
  openFolderDialog,
  readFileContent,
} from "../services/fileService";

/**
 * 文件操作的自定义 Hook
 * 提供文件操作的便捷方法
 */
export function useFileOperations() {
  /**
   * 检查路径是否存在
   */
  const checkExists = useCallback(
    async (path: string, baseDir?: BaseDirectory) => {
      return await checkPathExists(path, baseDir);
    },
    [],
  );

  /**
   * 打开文件选择对话框
   */
  const selectFile = useCallback(async () => {
    return await openFileDialog();
  }, []);

  /**
   * 选择文本或图片文件
   */
  const selectTextOrImage = useCallback(async () => {
    return await openTextOrImageFile();
  }, []);

  /**
   * 选择文件夹
   */
  const selectFolder = useCallback(async () => {
    return await openFolderDialog();
  }, []);

  /**
   * 读取文件内容
   */
  const readFile = useCallback(async (filePath: string) => {
    return await readFileContent(filePath);
  }, []);

  return {
    checkExists,
    selectFile,
    selectTextOrImage,
    selectFolder,
    readFile,
  };
}
