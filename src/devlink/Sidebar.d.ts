import * as React from "react";
import * as Types from "./types";

declare function Sidebar(props: {
  as?: React.ElementType;
  sidebarDashboard?: Types.Basic.Link;
  sidebarDevices?: Types.Basic.Link;
  sidebarServices?: Types.Basic.Link;
  sidebarWarranties?: Types.Basic.Link;
  sidebarQuotations?: Types.Basic.Link;
  sidebarInvoices?: Types.Basic.Link;
  sidebarApprovals?: Types.Basic.Link;
  sidebarUserName?: React.ReactNode;
  sidebarUserLogout?: Types.Basic.Link;
  sidebarUserProfile?: React.ReactNode;
  sidebarUserProfilePicture?: Types.Asset.Image;
  sidebarUserAccountType?: React.ReactNode;
}): React.JSX.Element;
