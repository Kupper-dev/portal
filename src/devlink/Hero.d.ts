import * as React from "react";
import * as Types from "./types";

declare function Hero(props: {
  as?: React.ElementType;
  /** Just name no surnames*/
  heroRecipientName?: React.ReactNode;
  heroButton1?: Types.Basic.Link;
  button1?: React.ReactNode;
  heroButton2?: Types.Basic.Link;
  heroButton22?: React.ReactNode;
}): React.JSX.Element;
