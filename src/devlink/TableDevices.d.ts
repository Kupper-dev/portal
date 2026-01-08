import * as React from "react";
import * as Types from "./types";

declare function TableDevices(props: {
  as?: React.ElementType;
  variant?: "Base" | "Positive" | "Warning" | "Negative";
  devicesBrandAndModel?: React.ReactNode;
  devicesDepartmentOrContact?: React.ReactNode;
  devicesItemIdFormatted?: React.ReactNode;
  devicesTypeIcon?: Types.Asset.Image;
  devicesStatusText?: React.ReactNode;
  devicesNextMaintenanceText?: React.ReactNode;
  remainingDaysToNextMaintenance?: React.ReactNode;
  devicesRemainingDaysToNextMaintenanceVisibility?: Types.Visibility.VisibilityConditions;
  devicesRequestMaintenance?: Types.Basic.Link;
  devicesRequestMaintenanceVisbility?: Types.Visibility.VisibilityConditions;
  devicesProgressBar?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
