import * as React from "react";
import * as Types from "./types";

declare function StatusRow(props: {
  as?: React.ElementType;
  variant?: "Base" | "active" | "check" | "no_state" | "hidden";
  statusStatusActionButton?: Types.Visibility.VisibilityConditions;
  statusActionPopup?: Types.Visibility.VisibilityConditions;
  statusTitle?: React.ReactNode;
  statusStatusMessage?: React.ReactNode;
  alert?: Types.Visibility.VisibilityConditions;
  statusDate?: React.ReactNode;
  statusHour?: React.ReactNode;
  alertMessageText?: React.ReactNode;
}): React.JSX.Element;
