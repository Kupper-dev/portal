import * as React from "react";
import * as Types from "./types";

declare function Header(props: {
  as?: React.ElementType;
  /** Link to User Profile*/
  userProfileLink?: Types.Devlink.RuntimeProps;
  /** Button to LogOut*/
  userLogOut?: Types.Devlink.RuntimeProps;
  userProfilePicture?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
