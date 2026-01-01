"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { StatusRow } from "./StatusRow";

export function ServicesDetailsAndStatus({
  as: _Component = _Builtin.Grid,
  devicesDeviceBrandModel = "Dispositivo marca y modelo",
  devicesSerial = "C024KWM003LA",
  servicesRequestOrIssue = "Solicitud o falla del dispositivo",
  servicesDataBackup = "Con respaldo",
  servicesPowerAdapter = "Sin cargador",
  servicesObservations = "Sin observaciones",
  servicesDate,

  servicesDiagnosis = {
    href: "#",
  },

  servicesDiagnosisAcceptance = {
    href: "#",
  },

  servicesDateServicesStatusDispositivoRecibido = "DD/MM/YY",
  servicesDateServicesStatusDispositivoEnRevision = "DD/MM/YY",
  servicesDateServiceStatusEnviarDiagnostico = "DD/MM/YY",
  servicesDateServicesStatusRefaccionesEnCamino = "DD/MM/YY",
  servicesDateServicesStatusIniciaReparacion = "DD/MM/YY",
  servicesDateServicesStatusEnviarCodigoDeSeguridad = "DD/MM/YY",
  servicesDateServicesStatusDispositivoEntregado = "DD/MM/YY",
  servicesAccessories = "Sin accesorios",
  servicesHourServicesStatusDispositivoRecibido = "00:00",
  servicesHourServicesStatusDispositivoEnRevision = "00:00",
  servicesHourServicesStatusIniciaReparacion = "00:00",
  servicesHourServicesStatusEnviarCodigoDeSeguridad = "00:00",
  servicesHourServicesStatusDispositivoEntregado = "00:00",
  servicesPrice = "Cargando precio...",
  servicesHourServicesStatusEnviarDiagnostico = "00:00",
  servicesHourServicesStatusRefaccionesEnCamino = "00:00",
  servicesServicePodioItemIdFormatted = {},
  servicesCreationDate = {},
  statusRow1Step1State = null,
  statusRow2Step2State = null,
  statusRow3Step3State = null,
  statusRow4Step4State = null,
  statusRow5Step5State = null,
  statusRow6Step6State = null,
  statusRow7Step7State = null,
  statusRow3StatusStatusButton1 = false,
  statusRow1StatusStatusButton1 = false,
  statusRow2StatusStatusButton1 = false,
  statusRow4StatusStatusButton1 = false,
  statusRow5StatusStatusButton1 = false,
  statusRow6StatusStatusButton1 = false,
  statusRow7StatusStatusButton1 = false,
  statusRow1StatusActionPopup = false,
  statusRow2StatusActionPopup = false,
  statusRow3StatusActionPopup = false,
  statusRow4StatusActionPopup = false,
  statusRow5StatusActionPopup = false,
  statusRow6StatusActionPopup = false,
  statusRow7StatusActionPopup = false,
  statusRow1Alert = false,
  statusRow2Alert = false,
  statusRow3Alert = false,
  statusRow4Alert = true,
  statusRow5Alert = true,
  statusRow6Alert = true,
  statusRow7Alert = true,
  statusRow1StatusStatusMessage = "Message",
  statusRow2StatusStatusMessage = "Message",
  statusRow3StatusStatusMessage = "Message",
  statusRow4StatusStatusMessage = "Message",
  statusRow5StatusStatusMessage = "Message",
  statusRow6StatusStatusMessage = "Message",
  statusRow7StatusStatusMessage = "Message",
}) {
  return (
    <_Component
      className="_1-2-grid"
      id="w-node-b33d686b-1fc0-5200-0a6f-d13c74e77201-74e77201"
      tag="div"
    >
      <_Builtin.Block
        className="module s-details"
        id="w-node-b33d686b-1fc0-5200-0a6f-d13c74e77202-74e77201"
        tag="div"
      >
        <_Builtin.Block className="card_header" tag="div">
          <_Builtin.Heading tag="h4">
            {"Detalles del servicio"}
          </_Builtin.Heading>
        </_Builtin.Block>
        <_Builtin.Block className="service_details" tag="div">
          <_Builtin.Block className="_1-5rem_container" tag="div">
            <_Builtin.Block className="title_2" tag="div">
              {devicesDeviceBrandModel}
            </_Builtin.Block>
            <_Builtin.Block
              className="no-space-bottom blue"
              tag="div"
              {...servicesServicePodioItemIdFormatted}
            >
              {"Folio"}
            </_Builtin.Block>
            <_Builtin.Block className="text_inflex_wrapper" tag="div">
              <_Builtin.Block className="small_text text_gray" tag="div">
                {"Serial: "}
              </_Builtin.Block>
              <_Builtin.Block className="small_text text_gray" tag="div">
                {devicesSerial}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className="wrapper_flex_h_left"
              id="w-node-b33d686b-1fc0-5200-0a6f-d13c74e7720f-74e77201"
              tag="div"
            />
            <_Builtin.Block className="wrapper_flex_v_space_between" tag="div">
              <_Builtin.Block className="detail_vertical" tag="div">
                <_Builtin.Block className="no-space-bottom" tag="div">
                  {"Solicitud o falla:"}
                </_Builtin.Block>
                <_Builtin.Block tag="div">
                  {servicesRequestOrIssue}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block className="detail_vertical" tag="div">
                <_Builtin.Block className="no-space-bottom" tag="div">
                  {"Respaldo:"}
                </_Builtin.Block>
                <_Builtin.Block tag="div">{servicesDataBackup}</_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block className="detail_vertical" tag="div">
                <_Builtin.Block className="no-space-bottom" tag="div">
                  {"Cargador:"}
                </_Builtin.Block>
                <_Builtin.Block tag="div">
                  {servicesPowerAdapter}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block className="detail_vertical" tag="div">
                <_Builtin.Block className="no-space-bottom" tag="div">
                  {"Observaciones:"}
                </_Builtin.Block>
                <_Builtin.Block tag="div">
                  {servicesObservations}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block className="detail_vertical" tag="div">
                <_Builtin.Block className="no-space-bottom" tag="div">
                  {"Accesorios:"}
                </_Builtin.Block>
                <_Builtin.Block tag="div">{servicesAccessories}</_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block className="detail_vertical" tag="div">
                <_Builtin.Block className="no-space-bottom" tag="div">
                  {"Fecha:"}
                </_Builtin.Block>
                <_Builtin.Block
                  tag="div"
                  id={servicesDate}
                  {...servicesCreationDate}
                >
                  {"27/12/25"}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className="status_card" tag="div">
        <_Builtin.Block
          className="card_header"
          id="w-node-_31c2c3bf-5a84-809e-fbce-b39972e5f07c-74e77201"
          tag="div"
        >
          <_Builtin.Heading tag="h4">{"Status del servicios"}</_Builtin.Heading>
        </_Builtin.Block>
        <_Builtin.Block
          className="spacer_1_rem"
          id="w-node-_09909b0b-1f76-8022-75ec-a3ba1ce6b334-74e77201"
          tag="div"
        />
        <StatusRow
          servicesDateServiceStatusEnviarDiagnostico={
            servicesDateServiceStatusEnviarDiagnostico
          }
          servicesHourServicesStatusEnviarDiagnostico={
            servicesHourServicesStatusEnviarDiagnostico
          }
          servicesPrice={servicesPrice}
          servicesDiagnosis={servicesDiagnosis}
          servicesDiagnosisAcceptance={servicesDiagnosisAcceptance}
          variant={statusRow1Step1State}
          alert={statusRow1Alert}
          statusStatusActionButton={statusRow1StatusStatusButton1}
          statusActionPopup={statusRow1StatusActionPopup}
          statusStatusMessage={statusRow1StatusStatusMessage}
        />
        <StatusRow
          servicesDateServiceStatusEnviarDiagnostico={
            servicesDateServiceStatusEnviarDiagnostico
          }
          servicesHourServicesStatusEnviarDiagnostico={
            servicesHourServicesStatusEnviarDiagnostico
          }
          servicesPrice={servicesPrice}
          servicesDiagnosis={servicesDiagnosis}
          servicesDiagnosisAcceptance={servicesDiagnosisAcceptance}
          variant={statusRow2Step2State}
          alert={statusRow2Alert}
          statusStatusActionButton={statusRow2StatusStatusButton1}
          statusActionPopup={statusRow2StatusActionPopup}
          statusStatusMessage={statusRow2StatusStatusMessage}
          statusTitle="Dispositivo en revisión "
        />
        <StatusRow
          servicesDateServiceStatusEnviarDiagnostico={
            servicesDateServiceStatusEnviarDiagnostico
          }
          servicesHourServicesStatusEnviarDiagnostico={
            servicesHourServicesStatusEnviarDiagnostico
          }
          servicesPrice={servicesPrice}
          servicesDiagnosis={servicesDiagnosis}
          servicesDiagnosisAcceptance={servicesDiagnosisAcceptance}
          statusActionPopup={statusRow3StatusActionPopup}
          statusStatusActionButton={statusRow3StatusStatusButton1}
          variant={statusRow3Step3State}
          alert={statusRow3Alert}
          statusStatusMessage={statusRow3StatusStatusMessage}
          statusTitle="Revisa tu diagnóstico"
        />
        <StatusRow
          servicesDateServiceStatusEnviarDiagnostico={
            servicesDateServiceStatusEnviarDiagnostico
          }
          servicesHourServicesStatusEnviarDiagnostico={
            servicesHourServicesStatusEnviarDiagnostico
          }
          servicesPrice={servicesPrice}
          servicesDiagnosis={servicesDiagnosis}
          servicesDiagnosisAcceptance={servicesDiagnosisAcceptance}
          variant={statusRow4Step4State}
          statusStatusActionButton={statusRow4StatusStatusButton1}
          statusActionPopup={statusRow4StatusActionPopup}
          alert={statusRow4Alert}
          statusStatusMessage={statusRow4StatusStatusMessage}
          statusTitle="Refacciones en camino"
        />
        <StatusRow
          servicesDateServiceStatusEnviarDiagnostico={
            servicesDateServiceStatusEnviarDiagnostico
          }
          servicesHourServicesStatusEnviarDiagnostico={
            servicesHourServicesStatusEnviarDiagnostico
          }
          servicesPrice={servicesPrice}
          servicesDiagnosis={servicesDiagnosis}
          servicesDiagnosisAcceptance={servicesDiagnosisAcceptance}
          variant={statusRow5Step5State}
          statusStatusActionButton={statusRow5StatusStatusButton1}
          statusActionPopup={statusRow5StatusActionPopup}
          alert={statusRow5Alert}
          statusStatusMessage={statusRow5StatusStatusMessage}
          statusTitle="Inicia reparación"
        />
        <StatusRow
          servicesDateServiceStatusEnviarDiagnostico={
            servicesDateServiceStatusEnviarDiagnostico
          }
          servicesHourServicesStatusEnviarDiagnostico={
            servicesHourServicesStatusEnviarDiagnostico
          }
          servicesPrice={servicesPrice}
          servicesDiagnosis={servicesDiagnosis}
          servicesDiagnosisAcceptance={servicesDiagnosisAcceptance}
          variant={statusRow6Step6State}
          statusStatusActionButton={statusRow6StatusStatusButton1}
          statusActionPopup={statusRow6StatusActionPopup}
          alert={statusRow6Alert}
          statusStatusMessage={statusRow6StatusStatusMessage}
          statusTitle="Lista para recolección"
        />
        <StatusRow
          servicesDateServiceStatusEnviarDiagnostico={
            servicesDateServiceStatusEnviarDiagnostico
          }
          servicesHourServicesStatusEnviarDiagnostico={
            servicesHourServicesStatusEnviarDiagnostico
          }
          servicesPrice={servicesPrice}
          servicesDiagnosis={servicesDiagnosis}
          servicesDiagnosisAcceptance={servicesDiagnosisAcceptance}
          variant={statusRow7Step7State}
          statusStatusActionButton={statusRow7StatusStatusButton1}
          statusActionPopup={statusRow7StatusActionPopup}
          alert={statusRow7Alert}
          statusStatusMessage={statusRow7StatusStatusMessage}
          statusTitle="Dispositivo entregado"
        />
      </_Builtin.Block>
    </_Component>
  );
}
