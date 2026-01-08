import * as React from "react";
import * as Types from "./types";

declare function ServicesTable(props: {
  as?: React.ElementType;
  variant?: "Base" | "Positive" | "Warning" | "Negative";
  servicesTitle?: React.ReactNode;
  servicesDeviceBrandAndModel?: React.ReactNode;
  servicesItemIdFormatted?: React.ReactNode;
  servicesDate?: React.ReactNode;
  servicesAproxCompletationDate?: React.ReactNode;
  servicesStatusText?: React.ReactNode;
}): React.JSX.Element;
