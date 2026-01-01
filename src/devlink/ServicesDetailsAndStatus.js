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

  servicesDateServiceStatusEnviarDiagnostico = "DD/MM/YY",
  servicesAccessories = "Sin accesorios",
  servicesPrice = "Cargando precio...",
  servicesHourServicesStatusEnviarDiagnostico = "00:00",
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
  servicePodioItemIdFormatted = "Folio",
  statusRow1StatusDate = "DD/MM/YY",
  statusRow1StatusHour = "00:00",
  statusRow2StatusDate = "DD/MM/YY",
  statusRow2StatusHour = "00:00",
  statusRow3StatusDate = "DD/MM/YY",
  statusRow3StatusHour = "00:00",
  statusRow4StatusDate = "DD/MM/YY",
  statusRow4StatusHour = "00:00",
  statusRow5StatusDate = "DD/MM/YY",
  statusRow5StatusHour = "00:00",
  statusRow6StatusDate = "DD/MM/YY",
  statusRow6StatusHour = "00:00",
  statusRow7StatusDate = "DD/MM/YY",
  statusRow7StatusHour = "00:00",
  statusRow1AlertMessageText = "Alert message",
  statusRow2AlertMessageText = "Alert message",
  statusRow3AlertMessageText = "Alert message",
  statusRow4AlertMessageText = "Alert message",
  statusRow5AlertMessageText = "Alert message",
  statusRow6AlertMessageText = "Alert message",
  statusRow7AlertMessageText = "Alert message",
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
              {servicePodioItemIdFormatted}
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
          variant={statusRow1Step1State}
          alert={statusRow1Alert}
          statusStatusActionButton={statusRow1StatusStatusButton1}
          statusActionPopup={statusRow1StatusActionPopup}
          statusStatusMessage={statusRow1StatusStatusMessage}
          statusDate={statusRow1StatusDate}
          statusHour={statusRow1StatusHour}
          alertMessageText={statusRow1AlertMessageText}
        />
        <StatusRow
          variant={statusRow2Step2State}
          alert={statusRow2Alert}
          statusStatusActionButton={statusRow2StatusStatusButton1}
          statusActionPopup={statusRow2StatusActionPopup}
          statusStatusMessage={statusRow2StatusStatusMessage}
          statusDate={statusRow2StatusDate}
          statusHour={statusRow2StatusHour}
          alertMessageText={statusRow2AlertMessageText}
          statusTitle="Dispositivo en revisión "
        />
        <StatusRow
          statusActionPopup={statusRow3StatusActionPopup}
          statusStatusActionButton={statusRow3StatusStatusButton1}
          variant={statusRow3Step3State}
          alert={statusRow3Alert}
          statusStatusMessage={statusRow3StatusStatusMessage}
          statusDate={statusRow3StatusDate}
          statusHour={statusRow3StatusHour}
          alertMessageText={statusRow3AlertMessageText}
          statusTitle="Revisa tu diagnóstico"
        />
        <StatusRow
          variant={statusRow4Step4State}
          statusStatusActionButton={statusRow4StatusStatusButton1}
          statusActionPopup={statusRow4StatusActionPopup}
          alert={statusRow4Alert}
          statusStatusMessage={statusRow4StatusStatusMessage}
          statusDate={statusRow4StatusDate}
          statusHour={statusRow4StatusHour}
          alertMessageText={statusRow4AlertMessageText}
          statusTitle="Refacciones en camino"
        />
        <StatusRow
          variant={statusRow5Step5State}
          statusStatusActionButton={statusRow5StatusStatusButton1}
          statusActionPopup={statusRow5StatusActionPopup}
          alert={statusRow5Alert}
          statusStatusMessage={statusRow5StatusStatusMessage}
          statusDate={statusRow5StatusDate}
          statusHour={statusRow5StatusHour}
          alertMessageText={statusRow5AlertMessageText}
          statusTitle="Inicia reparación"
        />
        <StatusRow
          variant={statusRow6Step6State}
          statusStatusActionButton={statusRow6StatusStatusButton1}
          statusActionPopup={statusRow6StatusActionPopup}
          alert={statusRow6Alert}
          statusStatusMessage={statusRow6StatusStatusMessage}
          statusDate={statusRow6StatusDate}
          statusHour={statusRow6StatusHour}
          alertMessageText={statusRow6AlertMessageText}
          statusTitle="Lista para recolección"
        />
        <StatusRow
          variant={statusRow7Step7State}
          statusStatusActionButton={statusRow7StatusStatusButton1}
          statusActionPopup={statusRow7StatusActionPopup}
          alert={statusRow7Alert}
          statusStatusMessage={statusRow7StatusStatusMessage}
          statusDate={statusRow7StatusDate}
          statusHour={statusRow7StatusHour}
          alertMessageText={statusRow7AlertMessageText}
          statusTitle="Dispositivo entregado"
        />
      </_Builtin.Block>
    </_Component>
  );
}
