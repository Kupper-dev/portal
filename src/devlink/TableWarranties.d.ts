import * as React from "react";
import * as Types from "./types";

declare function TableWarranties(props: {
  as?: React.ElementType;
  warrantiesItemDescription?: React.ReactNode;
  warrantiesItemQuantity?: React.ReactNode;
  warrantiesItemWarranty?: React.ReactNode;
  statusBadgeStatusTitle?: React.ReactNode;
  statusBadgeItemStatusBadgeVariant?: "Base" | "positive" | "negative";
  warrantiesItemValidity?: React.ReactNode;
  warrantiesItemObservations?: React.ReactNode;
}): React.JSX.Element;
