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
  servicesDateServicesStatusDispositivoRecibido?: React.ReactNode;
  servicesDateServicesStatusDispositivoEnRevision?: React.ReactNode;
  servicesDateServiceStatusEnviarDiagnostico?: React.ReactNode;
  servicesDateServicesStatusRefaccionesEnCamino?: React.ReactNode;
  servicesDateServicesStatusIniciaReparacion?: React.ReactNode;
  servicesDateServicesStatusEnviarCodigoDeSeguridad?: React.ReactNode;
  servicesDateServicesStatusDispositivoEntregado?: React.ReactNode;
  /** Customer gave accessories*/
  servicesAccessories?: React.ReactNode;
  servicesHourServicesStatusDispositivoRecibido?: React.ReactNode;
  servicesHourServicesStatusDispositivoEnRevision?: React.ReactNode;
  servicesHourServicesStatusIniciaReparacion?: React.ReactNode;
  servicesHourServicesStatusEnviarCodigoDeSeguridad?: React.ReactNode;
  servicesHourServicesStatusDispositivoEntregado?: React.ReactNode;
  /** Price of the service/diagnosis*/
  servicesPrice?: React.ReactNode;
  /** Hour Services Status:*/
  servicesHourServicesStatusEnviarDiagnostico?: React.ReactNode;
  servicesHourServicesStatusRefaccionesEnCamino?: React.ReactNode;
  servicesServicePodioItemIdFormatted?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
