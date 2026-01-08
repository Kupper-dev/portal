import * as React from "react";
import * as Types from "./types";

declare function ComplementaryTable(props: {
  as?: React.ElementType;
  variant?: "Base" | "Positive";
  complementaryRequestedBy?: React.ReactNode;
  complementaryPriceOfRequest?: React.ReactNode;
  complementaryItemIdFormatted?: React.ReactNode;
  complementaryDetailsOfRequest?: Types.Basic.Link;
  complementaryRequestDate?: React.ReactNode;
  requestAction?: Types.Basic.Link;
  complementaryRequestActionText?: React.ReactNode;
}): React.JSX.Element;
