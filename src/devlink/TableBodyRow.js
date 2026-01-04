"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { StatusBadge } from "./StatusBadge";
import { StatusRow } from "./StatusRow";

const _interactionsData = JSON.parse(
  '{"events":{"e-9":{"id":"e-9","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-9","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-10"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"7e9f016b-d977-bbc8-6141-c31db4de6a14","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"7e9f016b-d977-bbc8-6141-c31db4de6a14","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1767459688693},"e-10":{"id":"e-10","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-10","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-9"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"7e9f016b-d977-bbc8-6141-c31db4de6a14","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"7e9f016b-d977-bbc8-6141-c31db4de6a14","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1767459688694}},"actionLists":{"a-9":{"id":"a-9","title":"Row Open","actionItemGroups":[{"actionItems":[{"id":"a-9-n-3","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"7e9f016b-d977-bbc8-6141-c31db4de6a14"},"heightValue":4.26,"widthUnit":"PX","heightUnit":"rem","locked":false}}]},{"actionItems":[{"id":"a-9-n-2","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"outQuint","duration":800,"target":{"useEventTarget":true,"id":"7e9f016b-d977-bbc8-6141-c31db4de6a14"},"heightValue":100,"widthUnit":"PX","heightUnit":"%","locked":false}}]}],"useFirstGroupAsInitialState":true,"createdOn":1767459692598},"a-10":{"id":"a-10","title":"Row closes","actionItemGroups":[{"actionItems":[{"id":"a-10-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"outQuint","duration":800,"target":{"useEventTarget":true,"id":"7e9f016b-d977-bbc8-6141-c31db4de6a14"},"heightValue":4.25,"widthUnit":"PX","heightUnit":"rem","locked":false}}]}],"useFirstGroupAsInitialState":false,"createdOn":1767459878497}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function TableBodyRow({
  as: _Component = _Builtin.Block,
  variant = "Base",
  date = "00/00/00 ",
  hour = "00:00",
  aproxCompletationDate = "Calculando tiempo de entrega",
  servicesFormattedId = "S0000",
  deviceBrandAndModel = "Dispositivo",
  serialNumber = "Serial number:",
  deviceType = "Device type",
  departmentOrContact = (
    <>
      {"Department or contact"}
      <br />
    </>
  ),
  powerAdapter = "-",
  dataBackup = "-",
  requestOrIssue = "-",
  accesories = "-",
  observations = "-",
  statusRow1StatusActionPopup = false,
  statusRow1Variant = null,
  statusRow1Alert = false,
  statusRow1StatusDate = "00/00/00 ",
  statusRow1StatusHour = "00:00",
  statusRow1AlertMessageText = "Alert message",
  statusRow1StatusStatusActionButton = false,
  statusRow1StatusStatusMessage = "Message",
  statusRow2Variant = null,
  statusRow2StatusActionPopup = false,
  statusRow2Alert = false,
  statusRow2StatusDate = "DD/MM/YY",
  statusRow2StatusHour = "00:00",
  statusRow2AlertMessageText = "Alert message",
  statusRow2StatusStatusActionButton = false,
  statusRow2StatusTitle = "Dispositivo en revisión ",
  statusRow2StatusStatusMessage = "Message",
  statusRow3Variant = null,
  statusRow3StatusActionPopup = false,
  statusRow3Alert = false,
  statusRow3StatusDate = "DD/MM/YY",
  statusRow3StatusHour = "00:00",
  statusRow3AlertMessageText = "Alert message",
  statusRow3StatusStatusActionButton = false,
  statusRow3StatusStatusMessage = "Message",
  statusRow4Variant = null,
  statusRow4StatusActionPopup = false,
  statusRow4Alert = true,
  statusRow4StatusDate = "DD/MM/YY",
  statusRow4StatusHour = "00:00",
  statusRow4AlertMessageText = "Alert message",
  statusRow4StatusStatusActionButton = false,
  statusRow4StatusStatusMessage = "Message",
  statusRow5Variant = null,
  statusRow5StatusActionPopup = false,
  statusRow5Alert = true,
  statusRow5StatusDate = "DD/MM/YY",
  statusRow5StatusHour = "00:00",
  statusRow5AlertMessageText = "Alert message",
  statusRow5StatusStatusActionButton = false,
  statusRow5StatusStatusMessage = "Message",
  statusRow6Variant = null,
  statusRow6StatusActionPopup = false,
  statusRow6Alert = true,
  statusRow6StatusDate = "DD/MM/YY",
  statusRow6StatusHour = "00:00",
  statusRow6AlertMessageText = "Alert message",
  statusRow6StatusStatusActionButton = false,
  statusRow6StatusStatusMessage = "Message",
  statusRow7Variant = null,
  statusRow7StatusActionPopup = false,
  statusRow7Alert = true,
  statusRow7StatusDate = "DD/MM/YY",
  statusRow7StatusHour = "00:00",
  statusRow7AlertMessageText = "Alert message",
  statusRow7StatusStatusActionButton = false,
  statusRow7StatusStatusMessage = "Message",
  issueReformulation = "Falla del equipo",
  statusBadgeStatusTitle = "Inicia reparación",
  statusBadgeVariant = "Base",
}) {
  _interactions.useInteractions(_interactionsData);

  const _styleVariantMap = {
    Base: "",
    "status process": "w-variant-e4ddc992-34c1-854d-8741-68f86667b43f",
    "status finished": "w-variant-33c30a45-1e0f-3ec8-797c-07591a649549",
    "status negative": "w-variant-6f2c0dd4-4366-ecf1-3f7a-c51adbe0f49f",
  };

  const _activeStyleVariant = _styleVariantMap[variant];

  return (
    <_Component
      className={`dynamic_row ${_activeStyleVariant}`}
      id="w-node-_7e9f016b-d977-bbc8-6141-c31db4de6a14-b4de6a14"
      data-w-id="7e9f016b-d977-bbc8-6141-c31db4de6a14"
      tag="div"
    >
      <_Builtin.Block
        className={`table_body_row ${_activeStyleVariant}`}
        tag="div"
      >
        <_Builtin.Block
          className={`table_cell ${_activeStyleVariant}`}
          id="w-node-_7e9f016b-d977-bbc8-6141-c31db4de6a16-b4de6a14"
          tag="div"
        >
          <_Builtin.Block tag="div">
            <_Builtin.Block
              className={`no_space_bottom ${_activeStyleVariant}`}
              tag="div"
            >
              {issueReformulation}
            </_Builtin.Block>
            <_Builtin.Block
              className={`spacer_-25_rem ${_activeStyleVariant}`}
              tag="div"
            />
            <_Builtin.Block
              className={`small_text text_gray ${_activeStyleVariant}`}
              tag="div"
            >
              {deviceBrandAndModel}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={`no_space_bottom blue ${_activeStyleVariant}`}
            tag="div"
          >
            {servicesFormattedId}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={`table_cell h ${_activeStyleVariant}`}
          id="w-node-_7e9f016b-d977-bbc8-6141-c31db4de6a1e-b4de6a14"
          tag="div"
        >
          <StatusBadge
            variant={statusBadgeVariant}
            statusTitle={statusBadgeStatusTitle}
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={`table_cell v ${_activeStyleVariant}`}
          id="w-node-_7e9f016b-d977-bbc8-6141-c31db4de6a21-b4de6a14"
          tag="div"
        >
          <_Builtin.Block
            className={`small_text text_gray ${_activeStyleVariant}`}
            tag="div"
          >
            {date}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={`table_cell h ${_activeStyleVariant}`}
          id="w-node-_7e9f016b-d977-bbc8-6141-c31db4de6a26-b4de6a14"
          tag="div"
        >
          <_Builtin.Image
            className={`ui_icon_20 ${_activeStyleVariant}`}
            loading="lazy"
            width="auto"
            height="auto"
            alt=""
            src="https://cdn.prod.website-files.com/68d88947f902d5546e5fd07a/69576e2c57af7f49684ff1e6_time%20response.svg"
          />
          <_Builtin.Block
            className={`small_text text_blue ${_activeStyleVariant}`}
            tag="div"
          >
            {aproxCompletationDate}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={`row_expanded_details ${_activeStyleVariant}`}
        tag="div"
      >
        <_Builtin.Block
          className={`status_card ${_activeStyleVariant}`}
          tag="div"
        >
          <_Builtin.Block
            className={`card_header ${_activeStyleVariant}`}
            id="w-node-b16f461c-bb98-9818-bbb1-8481c1171afa-b4de6a14"
            tag="div"
          >
            <_Builtin.Heading tag="h4">
              {"Status del servicio"}
            </_Builtin.Heading>
          </_Builtin.Block>
          <_Builtin.Block
            className={`spacer_1_rem ${_activeStyleVariant}`}
            id="w-node-b16f461c-bb98-9818-bbb1-8481c1171afd-b4de6a14"
            tag="div"
          />
          <StatusRow
            variant={statusRow1Variant}
            alert={statusRow1Alert}
            statusStatusActionButton={statusRow1StatusStatusActionButton}
            statusActionPopup={statusRow1StatusActionPopup}
            statusStatusMessage={statusRow1StatusStatusMessage}
            statusDate={statusRow1StatusDate}
            statusHour={statusRow1StatusHour}
            alertMessageText={statusRow1AlertMessageText}
          />
          <StatusRow
            variant={statusRow2Variant}
            alert={statusRow2Alert}
            statusStatusActionButton={statusRow2StatusStatusActionButton}
            statusActionPopup={statusRow2StatusActionPopup}
            statusStatusMessage={statusRow2StatusStatusMessage}
            statusDate={statusRow2StatusDate}
            statusHour={statusRow2StatusHour}
            alertMessageText={statusRow2AlertMessageText}
            statusTitle="Dispositivo en revisión "
          />
          <StatusRow
            statusActionPopup={statusRow3StatusActionPopup}
            statusStatusActionButton={statusRow3StatusStatusActionButton}
            variant={statusRow3Variant}
            alert={statusRow3Alert}
            statusStatusMessage={statusRow3StatusStatusMessage}
            statusDate={statusRow3StatusDate}
            statusHour={statusRow3StatusHour}
            alertMessageText={statusRow3AlertMessageText}
            statusTitle="Revisa tu diagnóstico"
          />
          <StatusRow
            variant={statusRow4Variant}
            statusStatusActionButton={statusRow4StatusStatusActionButton}
            statusActionPopup={statusRow4StatusActionPopup}
            alert={statusRow4Alert}
            statusStatusMessage={statusRow4StatusStatusMessage}
            statusDate={statusRow4StatusDate}
            statusHour={statusRow4StatusHour}
            alertMessageText={statusRow4AlertMessageText}
            statusTitle="Refacciones en camino"
          />
          <StatusRow
            variant={statusRow5Variant}
            statusStatusActionButton={statusRow5StatusStatusActionButton}
            statusActionPopup={statusRow5StatusActionPopup}
            alert={statusRow5Alert}
            statusStatusMessage={statusRow5StatusStatusMessage}
            statusDate={statusRow5StatusDate}
            statusHour={statusRow5StatusHour}
            alertMessageText={statusRow5AlertMessageText}
            statusTitle="Inicia reparación"
          />
          <StatusRow
            variant={statusRow6Variant}
            statusStatusActionButton={statusRow6StatusStatusActionButton}
            statusActionPopup={statusRow6StatusActionPopup}
            alert={statusRow6Alert}
            statusStatusMessage={statusRow6StatusStatusMessage}
            statusDate={statusRow6StatusDate}
            statusHour={statusRow6StatusHour}
            alertMessageText={statusRow6AlertMessageText}
            statusTitle="Lista para recolección"
          />
          <StatusRow
            variant={statusRow7Variant}
            statusStatusActionButton={statusRow7StatusStatusActionButton}
            statusActionPopup={statusRow7StatusActionPopup}
            alert={statusRow7Alert}
            statusStatusMessage={statusRow7StatusStatusMessage}
            statusDate={statusRow7StatusDate}
            statusHour={statusRow7StatusHour}
            alertMessageText={statusRow7AlertMessageText}
            statusTitle="Dispositivo entregado"
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={`status_card ${_activeStyleVariant}`}
          id="w-node-_7e9f016b-d977-bbc8-6141-c31db4de6a4b-b4de6a14"
          tag="div"
        >
          <_Builtin.Block
            className={`card_header ${_activeStyleVariant}`}
            id="w-node-f84c5842-66c6-5131-ae7c-cc4779c57840-b4de6a14"
            tag="div"
          >
            <_Builtin.Heading tag="h4">
              {"Detalles del servicio"}
            </_Builtin.Heading>
          </_Builtin.Block>
          <_Builtin.Block
            className={`spacer_1_rem ${_activeStyleVariant}`}
            tag="div"
          />
          <_Builtin.Block
            className={`wrapper_flex_v_space_between ${_activeStyleVariant}`}
            id="w-node-f84c5842-66c6-5131-ae7c-cc4779c57844-b4de6a14"
            tag="div"
          >
            <_Builtin.Block
              className={`corner_box image ${_activeStyleVariant}`}
              tag="div"
            >
              <_Builtin.Block
                className={`wrapper_flex_h_space_between ${_activeStyleVariant}`}
                tag="div"
              >
                <_Builtin.Block tag="div">
                  <_Builtin.Block
                    className={`small_text ${_activeStyleVariant}`}
                    tag="div"
                  >
                    {deviceBrandAndModel}
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={`spacer_1_rem ${_activeStyleVariant}`}
                    tag="div"
                  />
                  <_Builtin.Block
                    className={`small_text ${_activeStyleVariant}`}
                    tag="div"
                  >
                    {serialNumber}
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={`spacer_1_rem ${_activeStyleVariant}`}
                    tag="div"
                  />
                  <_Builtin.Block
                    className={`small_text ${_activeStyleVariant}`}
                    tag="div"
                  >
                    {deviceType}
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={`spacer_1_rem ${_activeStyleVariant}`}
                    tag="div"
                  />
                  <_Builtin.Block
                    className={`small_text ${_activeStyleVariant}`}
                    tag="div"
                  >
                    {departmentOrContact}
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Image
                  className={`service_device_type ${_activeStyleVariant}`}
                  width="auto"
                  height="auto"
                  loading="lazy"
                  alt=""
                  src="https://cdn.prod.website-files.com/68d88947f902d5546e5fd07a/68d8ab4d19a030bafad06999_Dragonfly_4.png"
                />
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={`wrapper_flex_h_space_between ${_activeStyleVariant}`}
              tag="div"
            >
              <_Builtin.Block
                className={`corner_box blue ${_activeStyleVariant}`}
                tag="div"
              >
                <_Builtin.Block
                  className={`detail_vertical ${_activeStyleVariant}`}
                  tag="div"
                >
                  <_Builtin.Block
                    className={`no_space_bottom ${_activeStyleVariant}`}
                    tag="div"
                  >
                    {"Cargador:"}
                  </_Builtin.Block>
                  <_Builtin.Block tag="div">{powerAdapter}</_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={`spacer_h_1rem ${_activeStyleVariant}`}
                tag="div"
              />
              <_Builtin.Block
                className={`corner_box purple ${_activeStyleVariant}`}
                tag="div"
              >
                <_Builtin.Block
                  className={`detail_vertical ${_activeStyleVariant}`}
                  tag="div"
                >
                  <_Builtin.Block
                    className={`no_space_bottom ${_activeStyleVariant}`}
                    tag="div"
                  >
                    {"Respaldo:"}
                  </_Builtin.Block>
                  <_Builtin.Block tag="div">{dataBackup}</_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={`corner_box ${_activeStyleVariant}`}
              tag="div"
            >
              <_Builtin.Block
                className={`detail_vertical ${_activeStyleVariant}`}
                tag="div"
              >
                <_Builtin.Block
                  className={`no_space_bottom ${_activeStyleVariant}`}
                  tag="div"
                >
                  {"Solicitud o falla"}
                </_Builtin.Block>
                <_Builtin.Block tag="div">{requestOrIssue}</_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={`detail_vertical ${_activeStyleVariant}`}
                tag="div"
              >
                <_Builtin.Block
                  className={`no_space_bottom ${_activeStyleVariant}`}
                  tag="div"
                >
                  {"Accesorios"}
                </_Builtin.Block>
                <_Builtin.Block tag="div">{accesories}</_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={`detail_vertical ${_activeStyleVariant}`}
                tag="div"
              >
                <_Builtin.Block
                  className={`no_space_bottom ${_activeStyleVariant}`}
                  tag="div"
                >
                  {"Observaciones"}
                </_Builtin.Block>
                <_Builtin.Block tag="div">{observations}</_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
