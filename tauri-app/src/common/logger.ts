import { systemApi } from "../ipc/systemApi";

class Logger {
  /** 内部格式化：支持多参数序列化、Error对象堆栈提取、对象缩进换行 */
  private format(messages: unknown[]): string {
    return messages
      .map((item) => {
        if (item === null) return "null";
        if (item === undefined) return "undefined";

        if (typeof item === "object") {
          if (item instanceof Error) {
            return item.stack ?? item.message;
          }
          try {
            // 参数3设置为"  "使对象和数组在打印时自动换行并缩进
            return JSON.stringify(item, null, "  ");
          } catch {
            return "[Unserializable Object]";
          }
        }
        return String(item);
      })
      .join(" ");
  }

  i(...msg: unknown[]) {
    const output = this.format(msg);
    // \n 确保日志级别胶囊前换行，样式保持高亮
    // console.log(
    //   `\n%c[INFO]%c ${output}`,
    //   "color: #ffffff; background: #2563eb; padding: 2px 4px; border-radius: 3px; font-weight: bold;",
    //   "color: #1e293b;",
    // );
    systemApi.log.i(output);
  }

  w(...msg: unknown[]) {
    const output = this.format(msg);
    console.warn(
      `\n%c[WARN]%c ${output}`,
      "color: #ffffff; background: #d97706; padding: 2px 4px; border-radius: 3px; font-weight: bold;",
      "color: #b45309;",
    );
    systemApi.log.w(output);
  }

  e(...msg: unknown[]) {
    const output = this.format(msg);
    console.error(
      `\n%c[ERROR]%c ${output}`,
      "color: #ffffff; background: #dc2626; padding: 2px 4px; border-radius: 3px; font-weight: bold;",
      "color: #dc2626;",
    );
    systemApi.log.e(output);
  }

  d(...msg: unknown[]) {
    const output = this.format(msg);
    console.debug(
      `\n%c[DEBUG]%c ${output}`,
      "color: #ffffff; background: #4b5563; padding: 2px 4px; border-radius: 3px; font-weight: bold;",
      "color: #6b7280;",
    );
    systemApi.log.d(output);
  }
}

export default new Logger();
