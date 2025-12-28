import * as React from "react";
import * as Types from "./types";

declare function Hero(props: {
  as?: React.ElementType;
  /** Just name no surnames*/
  heroRecipientName?: React.ReactNode;
  /** PopUp displays available services to request*/
  heroRequestService?: Types.Basic.Link;
  /** Link To request appointment PopUp*/
  heroRequestAppointment?: Types.Basic.Link;
  heroRequestServicePopup?: Types.Devlink.RuntimeProps;
  heroRequestAppointmentPopup?: Types.Devlink.RuntimeProps;
  heroRecipientNameOnly?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
