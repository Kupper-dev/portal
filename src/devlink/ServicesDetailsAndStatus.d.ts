import * as React from "react";
import * as Types from "./types";

declare function ServicesDetailsAndStatus(props: {
  as?: React.ElementType;
  /** Brand and model of the device of service of customer*/
  devicesDeviceBrandModel?: React.ReactNode;
  /** Serial number of the device*/
  devicesSerial?: React.ReactNode;
  /** Request or issue of the service device*/
  servicesRequestOrIssue?: React.ReactNode;
  /** Describes if the customer requested data backup*/
  servicesDataBackup?: React.ReactNode;
  /** Describes if customer gave the power adapter or power cord*/
  servicesPowerAdapter?: React.ReactNode;
  /** Describes observation related to device or services that are worth to technician*/
  servicesObservations?: React.ReactNode;
  /** Date of the services creation*/
  servicesDate?: Types.Basic.IdTextInput;
  /** Link to popup that show the  diagnosis of the service.*/
  servicesDiagnosis?: Types.Basic.Link;
  /** Button that notifies system that customer accept diagnosis and price so we can proceed with service*/
  servicesDiagnosisAcceptance?: Types.Basic.Link;
  servicesDateServiceStatusEnviarDiagnostico?: React.ReactNode;
  /** Customer gave accessories*/
  servicesAccessories?: React.ReactNode;
  /** Price of the service/diagnosis*/
  servicesPrice?: React.ReactNode;
  /** Hour Services Status:*/
  servicesHourServicesStatusEnviarDiagnostico?: React.ReactNode;
  servicesServicePodioItemIdFormatted?: Types.Devlink.RuntimeProps;
  servicesCreationDate?: Types.Devlink.RuntimeProps;
  statusRow1Step1State?: "Base" | "active" | "check" | "no_state" | "hidden";
  statusRow2Step2State?: "Base" | "active" | "check" | "no_state" | "hidden";
  statusRow3Step3State?: "Base" | "active" | "check" | "no_state" | "hidden";
  statusRow4Step4State?: "Base" | "active" | "check" | "no_state" | "hidden";
  statusRow5Step5State?: "Base" | "active" | "check" | "no_state" | "hidden";
  statusRow6Step6State?: "Base" | "active" | "check" | "no_state" | "hidden";
  statusRow7Step7State?: "Base" | "active" | "check" | "no_state" | "hidden";
  statusRow3StatusStatusButton1?: Types.Visibility.VisibilityConditions;
  statusRow1StatusStatusButton1?: Types.Visibility.VisibilityConditions;
  statusRow2StatusStatusButton1?: Types.Visibility.VisibilityConditions;
  statusRow4StatusStatusButton1?: Types.Visibility.VisibilityConditions;
  statusRow5StatusStatusButton1?: Types.Visibility.VisibilityConditions;
  statusRow6StatusStatusButton1?: Types.Visibility.VisibilityConditions;
  statusRow7StatusStatusButton1?: Types.Visibility.VisibilityConditions;
  statusRow1StatusActionPopup?: Types.Visibility.VisibilityConditions;
  statusRow2StatusActionPopup?: Types.Visibility.VisibilityConditions;
  statusRow3StatusActionPopup?: Types.Visibility.VisibilityConditions;
  statusRow4StatusActionPopup?: Types.Visibility.VisibilityConditions;
  statusRow5StatusActionPopup?: Types.Visibility.VisibilityConditions;
  statusRow6StatusActionPopup?: Types.Visibility.VisibilityConditions;
  statusRow7StatusActionPopup?: Types.Visibility.VisibilityConditions;
  statusRow1Alert?: Types.Visibility.VisibilityConditions;
  statusRow2Alert?: Types.Visibility.VisibilityConditions;
  statusRow3Alert?: Types.Visibility.VisibilityConditions;
  statusRow4Alert?: Types.Visibility.VisibilityConditions;
  statusRow5Alert?: Types.Visibility.VisibilityConditions;
  statusRow6Alert?: Types.Visibility.VisibilityConditions;
  statusRow7Alert?: Types.Visibility.VisibilityConditions;
  statusRow1StatusStatusMessage?: React.ReactNode;
  statusRow2StatusStatusMessage?: React.ReactNode;
  statusRow3StatusStatusMessage?: React.ReactNode;
  statusRow4StatusStatusMessage?: React.ReactNode;
  statusRow5StatusStatusMessage?: React.ReactNode;
  statusRow6StatusStatusMessage?: React.ReactNode;
  statusRow7StatusStatusMessage?: React.ReactNode;
  servicePodioItemIdFormatted?: React.ReactNode;
  statusRow1StatusDate?: React.ReactNode;
  statusRow1StatusHour?: React.ReactNode;
  statusRow2StatusDate?: React.ReactNode;
  statusRow2StatusHour?: React.ReactNode;
  statusRow3StatusDate?: React.ReactNode;
  statusRow3StatusHour?: React.ReactNode;
  statusRow4StatusDate?: React.ReactNode;
  statusRow4StatusHour?: React.ReactNode;
  statusRow5StatusDate?: React.ReactNode;
  statusRow5StatusHour?: React.ReactNode;
  statusRow6StatusDate?: React.ReactNode;
  statusRow6StatusHour?: React.ReactNode;
  statusRow7StatusDate?: React.ReactNode;
  statusRow7StatusHour?: React.ReactNode;
  statusRow1AlertMessageText?: React.ReactNode;
  statusRow2AlertMessageText?: React.ReactNode;
  statusRow3AlertMessageText?: React.ReactNode;
  statusRow4AlertMessageText?: React.ReactNode;
  statusRow5AlertMessageText?: React.ReactNode;
  statusRow6AlertMessageText?: React.ReactNode;
  statusRow7AlertMessageText?: React.ReactNode;
}): React.JSX.Element;
