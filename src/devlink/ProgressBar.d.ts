import * as React from "react";
import * as Types from "./types";

declare function ProgressBar(props: {
  as?: React.ElementType;
  variant?: "Base" | "positive" | "negative";
  progressbar?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
