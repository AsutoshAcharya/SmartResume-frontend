import { FC, JSX, LazyExoticComponent, MemoExoticComponent } from "react";

export type AppRoute = {
  title: string;
  path: string;
  Element: LazyExoticComponent<() => JSX.Element> | (() => JSX.Element);
  skeleton?: MemoExoticComponent<FC<any>> | (() => JSX.Element);
};
