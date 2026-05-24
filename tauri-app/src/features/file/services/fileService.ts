import { exists, BaseDirectory, readTextFile } from "@tauri-apps/plugin-fs";
import { open, OpenDialogOptions } from "@tauri-apps/plugin-dialog";
import logger from "@/shared/utils/logger";

/**
 * 文件服务 - 封装所有文件系统操作
 */

/**
 * 检查路径是否存在
 * @param path 相对路径
 * @param baseDir 基础目录
 */
async function checkPathExists(
  path: string,
  baseDir: BaseDirectory = BaseDirectory.AppData,
): Promise<boolean> {
  try {
    return await exists(path, { baseDir });
  } catch (error) {
    console.error("检查路径是否存在时出错:", error);
    return false;
  }
}

/**
 * 打开文件选择对话框
 * @param options 对话框选项
 */
async function openFileDialog(
  options?: OpenDialogOptions,
): Promise<string | string[] | null> {
  try {
    logger.i("打开文件选择对话框", options);
    const defaultOptions: OpenDialogOptions = {
      multiple: false,
      directory: false,
      ...options,
    };
    const res = await open(defaultOptions);
    logger.i("打开文件选择对话框结果", res);
    return res;
  } catch (error) {
    logger.e("打开文件选择对话框时出错:", error);
    return null;
  }
}

/**
 * 打开文件选择对话框（选择文本或图片）
 */
async function openTextOrImageFile(): Promise<string | null> {
  const result = await openFileDialog({
    filters: [
      {
        name: "文本或图片",
        extensions: ["txt", "md", "png", "jpg", "jpeg"],
      },
    ],
  });

  if (result === null) {
    return null;
  }

  return Array.isArray(result) ? result[0] : result;
}

/**
 * 打开文件夹选择对话框
 */
async function openFolderDialog(): Promise<string | null> {
  const result = await openFileDialog({
    directory: true,
  });

  if (result === null) {
    return null;
  }

  return Array.isArray(result) ? result[0] : result;
}

/**
 * 读取文本文件内容
 * @param filePath 文件绝对路径
 * @returns 文件内容字符串
 */
async function readFileContent(filePath: string): Promise<string | null> {
  try {
    logger.i("读取文件内容", filePath);
    const content = await readTextFile(filePath);
    logger.i("文件内容读取成功", {
      length: content.length,
      content,
    });
    return content;
  } catch (error) {
    logger.e("读取文件内容时出错:", error);
    return null;
  }
}

export {
  // 检查路径是否存在
  checkPathExists,
  // 打开文件选择对话框
  openFileDialog,
  // 选择文本或图片文件
  openTextOrImageFile,
  // 选择文件夹
  openFolderDialog,
  // 读取文件内容
  readFileContent,
};
