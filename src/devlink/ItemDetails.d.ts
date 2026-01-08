import * as React from "react";
import * as Types from "./types";

declare function ItemDetails(props: {
  as?: React.ElementType;
  variant?: "Base" | "Positive" | "Warning" | "Negative";
  detailsTitle?: React.ReactNode;
  detailsStatus?: React.ReactNode;
  detailsIdFormatted?: React.ReactNode;
  detailsDetail1?: React.ReactNode;
  detailsDetail2?: React.ReactNode;
  detailsDetail3?: React.ReactNode;
  detailsActionButton?: Types.Basic.Link;
  detailsActionText?: React.ReactNode;
  detailsProgress?: Types.Visibility.VisibilityConditions;
  detailsProgressText1?: React.ReactNode;
  detailsProgressText2?: React.ReactNode;
  detailsProgressValue1?: React.ReactNode;
  detailsProgressValue2?: React.ReactNode;
  detailsProgressBar?: Types.Devlink.RuntimeProps;
  detailsActionButtonVisibility?: Types.Visibility.VisibilityConditions;
  detailsDetail3Visibility?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
