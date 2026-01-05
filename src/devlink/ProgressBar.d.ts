import * as React from "react";
import * as Types from "./types";

declare function ProgressBar(props: {
  as?: React.ElementType;
  variant?: "Base" | "positive" | "negative" | "no-maintenance";
  progressbar?: Types.Devlink.RuntimeProps;
  requestMaintenance?: Types.Basic.Link;
}): React.JSX.Element;
