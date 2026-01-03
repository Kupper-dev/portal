import * as React from "react";
import * as Types from "./types";

declare function StatusBadge(props: {
  as?: React.ElementType;
  variant?: "Base" | "positive" | "negative";
  statusTitle?: React.ReactNode;
}): React.JSX.Element;
