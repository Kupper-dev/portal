import * as React from "react";
import * as Types from "./types";

declare function TrackerCell(props: {
  as?: React.ElementType;
  variant?: "Base" | "check";
  trackerDate?: React.ReactNode;
  trackerHour?: React.ReactNode;
  trackerStatusTitle?: React.ReactNode;
  trackerStatusMessage?: React.ReactNode;
  trackerAlert?: Types.Visibility.VisibilityConditions;
  trackerAlertText?: React.ReactNode;
  trackerLink1?: Types.Basic.Link;
  trackerLink1Text?: React.ReactNode;
  trackerLink1Visibility?: Types.Visibility.VisibilityConditions;
  trackerLink2Visibility?: Types.Visibility.VisibilityConditions;
  link2?: Types.Basic.Link;
  trackerLink2Text?: React.ReactNode;
  trackerLinksWrapperVisibility?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
