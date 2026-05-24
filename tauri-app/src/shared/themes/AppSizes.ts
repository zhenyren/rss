export interface ISize {
  i: number;
  unocss: string;
}

export interface IAppSizes {
  AppTitleBarHeight: ISize;
}

export const AppSizes: IAppSizes = Object.freeze({
  AppTitleBarHeight: {
    i: 36,
    unocss: "h-9",
  },
});
