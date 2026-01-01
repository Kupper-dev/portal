"use client";
import React from "react";
import * as _Builtin from "./_Builtin";

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
  statusDate = "DD/MM/YY",
  statusHour = "00:00",
  alertMessageText = "Alert message",
}) {
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
            {statusDate}
          </_Builtin.Block>
          <_Builtin.Block
            className={`small_text text_gray ${_activeStyleVariant}`}
            tag="div"
            {...statusHour}
          >
            {statusHour}
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
            >
              {alertMessageText}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
    </_Component>
  );
}
