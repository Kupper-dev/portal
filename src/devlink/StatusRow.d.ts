import * as React from "react";
import * as Types from "./types";

declare function StatusRow(props: {
  as?: React.ElementType;
  variant?: "Base" | "active" | "check" | "no_state" | "hidden";
  servicesDateServiceStatusEnviarDiagnostico?: React.ReactNode;
  /** Hour Services Status:*/
  servicesHourServicesStatusEnviarDiagnostico?: React.ReactNode;
  /** Price of the service/diagnosis*/
  servicesPrice?: React.ReactNode;
  /** Link to popup that show the  diagnosis of the service.*/
  servicesDiagnosis?: Types.Basic.Link;
  /** Button that notifies system that customer accept diagnosis and price so we can proceed with service*/
  servicesDiagnosisAcceptance?: Types.Basic.Link;
  statusStatusTitle?: Types.Devlink.RuntimeProps;
  statusDate?: Types.Devlink.RuntimeProps;
  statusStatusActionButton?: Types.Visibility.VisibilityConditions;
  statusActionPopup?: Types.Visibility.VisibilityConditions;
  statusStatusCurrentMessage?: Types.Devlink.RuntimeProps;
  statusTitle?: React.ReactNode;
  statusStatusMessage?: React.ReactNode;
  statusHour?: Types.Devlink.RuntimeProps;
  alert?: Types.Visibility.VisibilityConditions;
  alertMessage?: Types.Devlink.RuntimeProps;
  statusDate?: React.ReactNode;
  statusHour?: React.ReactNode;
  alertMessageText?: React.ReactNode;
}): React.JSX.Element;
