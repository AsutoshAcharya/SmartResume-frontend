import { ReactElement } from "react";

export type Resume = {
  id: string;
  title: string;
  updatedAt: string;
};
export enum State {
  Default = "Default",
  Edit = "Edit",
  View = "View",
  Download = "Download",
  Delete = "Delete",
}
export type Action = {
  state: State;
  Icon: ReactElement;
  onClick: () => void;
};
