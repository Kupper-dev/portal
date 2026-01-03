import * as React from "react";
import * as Types from "./types";

declare function Sidebar(props: {
  as?: React.ElementType;
  sIdebarServices?: Types.Basic.Link;
  dashboard?: Types.Basic.Link;
  warranties?: Types.Basic.Link;
  devices?: Types.Basic.Link;
  approvals?: Types.Basic.Link;
  invoices?: Types.Basic.Link;
}): React.JSX.Element;
