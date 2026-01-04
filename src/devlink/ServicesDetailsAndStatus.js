"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { StatusCard } from "./StatusCard";

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
              className="no_space_bottom blue"
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
                <_Builtin.Block className="no_space_bottom" tag="div">
                  {"Solicitud o falla:"}
                </_Builtin.Block>
                <_Builtin.Block tag="div">
                  {servicesRequestOrIssue}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block className="detail_vertical" tag="div">
                <_Builtin.Block className="no_space_bottom" tag="div">
                  {"Respaldo:"}
                </_Builtin.Block>
                <_Builtin.Block tag="div">{servicesDataBackup}</_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block className="detail_vertical" tag="div">
                <_Builtin.Block className="no_space_bottom" tag="div">
                  {"Cargador:"}
                </_Builtin.Block>
                <_Builtin.Block tag="div">
                  {servicesPowerAdapter}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block className="detail_vertical" tag="div">
                <_Builtin.Block className="no_space_bottom" tag="div">
                  {"Observaciones:"}
                </_Builtin.Block>
                <_Builtin.Block tag="div">
                  {servicesObservations}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block className="detail_vertical" tag="div">
                <_Builtin.Block className="no_space_bottom" tag="div">
                  {"Accesorios:"}
                </_Builtin.Block>
                <_Builtin.Block tag="div">{servicesAccessories}</_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block className="detail_vertical" tag="div">
                <_Builtin.Block className="no_space_bottom" tag="div">
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
      <StatusCard
        statusRow1Step1State={statusRow1Step1State}
        statusRow1Alert={statusRow1Alert}
        statusRow1StatusStatusButton1={statusRow1StatusStatusButton1}
        statusRow1StatusActionPopup={statusRow1StatusActionPopup}
        statusRow1StatusStatusMessage={statusRow1StatusStatusMessage}
        statusRow1StatusDate={statusRow1StatusDate}
        statusRow1StatusHour={statusRow1StatusHour}
        statusRow1AlertMessageText={statusRow1AlertMessageText}
        statusRow2Step2State={statusRow2Step2State}
        statusRow2Alert={statusRow2Alert}
        statusRow2StatusStatusButton1={statusRow2StatusStatusButton1}
        statusRow2StatusActionPopup={statusRow2StatusActionPopup}
        statusRow2StatusStatusMessage={statusRow2StatusStatusMessage}
        statusRow2StatusDate={statusRow2StatusDate}
        statusRow2StatusHour={statusRow2StatusHour}
        statusRow2AlertMessageText={statusRow2AlertMessageText}
        statusRow3StatusActionPopup={statusRow3StatusActionPopup}
        statusRow3StatusStatusButton1={statusRow3StatusStatusButton1}
        statusRow3Step3State={statusRow3Step3State}
        statusRow3Alert={statusRow3Alert}
        statusRow3StatusStatusMessage={statusRow3StatusStatusMessage}
        statusRow3StatusDate={statusRow3StatusDate}
        statusRow3StatusHour={statusRow3StatusHour}
        statusRow3AlertMessageText={statusRow3AlertMessageText}
        statusRow4Step4State={statusRow4Step4State}
        statusRow4StatusStatusButton1={statusRow4StatusStatusButton1}
        statusRow4StatusActionPopup={statusRow4StatusActionPopup}
        statusRow4Alert={statusRow4Alert}
        statusRow4StatusStatusMessage={statusRow4StatusStatusMessage}
        statusRow4StatusDate={statusRow4StatusDate}
        statusRow4StatusHour={statusRow4StatusHour}
        statusRow4AlertMessageText={statusRow4AlertMessageText}
        statusRow5Step5State={statusRow5Step5State}
        statusRow5StatusStatusButton1={statusRow5StatusStatusButton1}
        statusRow5StatusActionPopup={statusRow5StatusActionPopup}
        statusRow5Alert={statusRow5Alert}
        statusRow5StatusStatusMessage={statusRow5StatusStatusMessage}
        statusRow5StatusDate={statusRow5StatusDate}
        statusRow5StatusHour={statusRow5StatusHour}
        statusRow5AlertMessageText={statusRow5AlertMessageText}
        statusRow6Step6State={statusRow6Step6State}
        statusRow6StatusStatusButton1={statusRow6StatusStatusButton1}
        statusRow6StatusActionPopup={statusRow6StatusActionPopup}
        statusRow6Alert={statusRow6Alert}
        statusRow6StatusStatusMessage={statusRow6StatusStatusMessage}
        statusRow6StatusDate={statusRow6StatusDate}
        statusRow6StatusHour={statusRow6StatusHour}
        statusRow6AlertMessageText={statusRow6AlertMessageText}
        statusRow7Step7State={statusRow7Step7State}
        statusRow7StatusStatusButton1={statusRow7StatusStatusButton1}
        statusRow7StatusActionPopup={statusRow7StatusActionPopup}
        statusRow7Alert={statusRow7Alert}
        statusRow7StatusStatusMessage={statusRow7StatusStatusMessage}
        statusRow7StatusDate={statusRow7StatusDate}
        statusRow7StatusHour={statusRow7StatusHour}
        statusRow7AlertMessageText={statusRow7AlertMessageText}
      />
    </_Component>
  );
}
