import * as React from "react";
import * as Types from "./types";

declare function WarrantiesTable(props: {
  as?: React.ElementType;
  variant?: "Base" | "Positive" | "Warning" | "Negative" | "Archived";
  warrantiesItemTitle?: React.ReactNode;
  warrantiesDetails?: React.ReactNode;
  warrantiesQuantity?: React.ReactNode;
  warrantiesWarrantyPeriod?: React.ReactNode;
  warrantiesStatusText?: React.ReactNode;
  warrantiesWarrantyValidity?: React.ReactNode;
}): React.JSX.Element;
