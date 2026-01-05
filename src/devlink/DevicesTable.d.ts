import * as React from "react";
import * as Types from "./types";

declare function DevicesTable(props: {
  as?: React.ElementType;
  devicesDeviceAssignedTo?: React.ReactNode;
  devicesDeviceFormattedId?: React.ReactNode;
  devicesDeviceType?: Types.Asset.Image;
  devicesDeviceRemainingDaysToNextMaintenance?: React.ReactNode;
  devicesDeviceBrandAndModel?: React.ReactNode;
  statusBadgeDeviceStatusBadgeVariant?: "Base" | "positive" | "negative";
  statusBadgeDeviceStatusText?: React.ReactNode;
  devicesDeviceRam?: React.ReactNode;
  devicesDeviceSerialNumber?: React.ReactNode;
  devicesDeviceCpu?: React.ReactNode;
  devicesDeviceStorage?: React.ReactNode;
  devicesDeviceStorageType?: React.ReactNode;
  devicesDeviceLastService?: Types.Basic.Link;
  devicesDeviceProgressBar?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
