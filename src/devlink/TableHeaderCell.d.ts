import * as React from "react";
import * as Types from "./types";

declare function TableHeaderCell(props: {
  as?: React.ElementType;
  variant?: "Base" | "up" | "down";
  cellTitle?: React.ReactNode;
}): React.JSX.Element;
