"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";

const _interactionsData = JSON.parse(
  '{"events":{"e-3":{"id":"e-3","name":"","animationType":"custom","eventTypeId":"PAGE_START","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-3","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-4"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"wf-page-id","appliesTo":"PAGE","styleBlockIds":[]},"targets":[{"id":"wf-page-id","appliesTo":"PAGE","styleBlockIds":[]}],"config":{"loop":true,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1759352590844}},"actionLists":{"a-3":{"id":"a-3","title":"status_circle","actionItemGroups":[{"actionItems":[{"id":"a-3-n","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":500,"easing":"ease","duration":500,"target":{"selector":".status_check_icon","selectorGuids":["899a11a4-9659-7849-8bcb-87f98c24fd1d"]},"globalSwatchId":"","rValue":255,"bValue":0,"gValue":157,"aValue":1}}]},{"actionItems":[{"id":"a-3-n-2","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":500,"easing":"ease","duration":500,"target":{"selector":".status_check_icon","selectorGuids":["899a11a4-9659-7849-8bcb-87f98c24fd1d"]},"globalSwatchId":"--green","rValue":102,"bValue":98,"gValue":223,"aValue":1}}]}],"useFirstGroupAsInitialState":false,"createdOn":1759352595425}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function StatusRow({
  as: _Component = _Builtin.Block,
  variant = "Base",
  servicesDateServiceStatusEnviarDiagnostico = "DD/MM/YY",
  servicesHourServicesStatusEnviarDiagnostico = "00:00",
  servicesPrice = "Cargando precio...",

  servicesDiagnosis = {
    href: "#",
  },

  servicesDiagnosisAcceptance = {
    href: "#",
  },

  statusStatusTitle = {},
  statusDate = {},
  statusStatusActionButton = false,
  statusActionPopup = false,
  statusStatusCurrentMessage = {},
  statusTitle = "Dispositivo recibido ",
  statusStatusMessage = "Message",
  statusHour = {},
  alert = true,
  alertMessage = {},
}) {
  _interactions.useInteractions(_interactionsData);

  const _styleVariantMap = {
    Base: "",
    active: "w-variant-1272c514-8402-5171-ef79-3e73d85db63e",
    check: "w-variant-300ccf83-b3d7-9b81-48e8-cd2c711433c7",
    no_state: "w-variant-950f7ec7-6ade-871a-9d0e-b3048a46e0ed",
    hidden: "w-variant-2098dcce-b154-b3a8-e60d-3a92f56b93a0",
  };

  const _activeStyleVariant = _styleVariantMap[variant];

  return (
    <_Component
      className={`status_row ${_activeStyleVariant}`}
      id="w-node-_3cebe0b9-0dd5-95ff-ac29-1f2168ee9178-68ee9178"
      tag="div"
    >
      <_Builtin.Block
        className={`wrapper_flex_h_space_between ${_activeStyleVariant}`}
        id="w-node-_3cebe0b9-0dd5-95ff-ac29-1f2168ee9179-68ee9178"
        tag="div"
      >
        <_Builtin.Block
          className={`status_check_icon ${_activeStyleVariant}`}
          tag="div"
        />
        <_Builtin.Block
          className={`status_time_wrapper ${_activeStyleVariant}`}
          tag="div"
        >
          <_Builtin.Block
            className={`small_text text_gray ${_activeStyleVariant}`}
            tag="div"
            {...statusDate}
          >
            {"DD/MM/YY"}
          </_Builtin.Block>
          <_Builtin.Block
            className={`small_text text_gray ${_activeStyleVariant}`}
            tag="div"
            {...statusHour}
          >
            {"00:00"}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={`status_cell ${_activeStyleVariant}`}
        id="w-node-_3cebe0b9-0dd5-95ff-ac29-1f2168ee917e-68ee9178"
        tag="div"
      >
        <_Builtin.Heading
          className={`no-space-bottom ${_activeStyleVariant}`}
          tag="h6"
        >
          {statusTitle}
        </_Builtin.Heading>
        <_Builtin.Block
          className={`status_message ${_activeStyleVariant}`}
          id="w-node-_3cebe0b9-0dd5-95ff-ac29-1f2168ee9181-68ee9178"
          tag="div"
        >
          {statusStatusMessage}
        </_Builtin.Block>
        <_Builtin.Block
          className={`wrapper_flex_h_space_between ${_activeStyleVariant}`}
          id="w-node-_3cebe0b9-0dd5-95ff-ac29-1f2168ee9182-68ee9178"
          tag="div"
        >
          {statusActionPopup ? (
            <_Builtin.Link
              className={`dashboard_link ${_activeStyleVariant}`}
              button={false}
              block=""
              options={{
                href: "#",
              }}
            >
              {"Ver diagnostico "}
              <_Builtin.Span
                className={`north_east_arrow ${_activeStyleVariant}`}
              >
                {"↗"}
              </_Builtin.Span>
            </_Builtin.Link>
          ) : null}
          {statusStatusActionButton ? (
            <_Builtin.Link
              className={`dashboard_button ${_activeStyleVariant}`}
              button={true}
              block=""
              options={{
                href: "#",
              }}
            >
              {"Aceptar servicio"}
            </_Builtin.Link>
          ) : null}
        </_Builtin.Block>
        {alert ? (
          <_Builtin.Block className={`alert ${_activeStyleVariant}`} tag="div">
            <_Builtin.Image
              loading="lazy"
              width="auto"
              height="auto"
              alt=""
              src="https://cdn.prod.website-files.com/68d88947f902d5546e5fd07a/6955ba600b8602416fabefcc_74d0287992040702c13968e39f65cf45_alert.svg"
            />
            <_Builtin.Block
              className={`alert_message ${_activeStyleVariant}`}
              tag="div"
              {...alertMessage}
            >
              {"Alert message"}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
    </_Component>
  );
}
