"use client";
import React from "react";
import * as _Builtin from "./_Builtin";

export function TableDevices({
  as: _Component = _Builtin.Block,
  variant = "Base",
  devicesBrandAndModel = "Brand and model",
  devicesDepartmentOrContact = "Departamento o persona",
  devicesItemIdFormatted = "D003",
  devicesTypeIcon = "",
  devicesStatusText = "Status",
  devicesNextMaintenanceText = "Siguiente mantenimiento",
  remainingDaysToNextMaintenance = "Faltan XX días",
  devicesRemainingDaysToNextMaintenanceVisibility = true,

  devicesRequestMaintenance = {
    href: "#",
  },

  devicesRequestMaintenanceVisbility = true,
  devicesProgressBar = {},
}) {
  const _styleVariantMap = {
    Base: "",
    Positive: "w-variant-c6b495b7-1ea8-e7e0-8bb4-9ac5c973b5be",
    Warning: "w-variant-14324a70-9857-3ffa-eea4-1a6703dd805f",
    Negative: "w-variant-9c87b223-2013-18ba-f09f-cb4a65f3ca5b",
  };

  const _activeStyleVariant = _styleVariantMap[variant];

  return (
    <_Component
      className={`table-row devices ${_activeStyleVariant}`}
      id="w-node-_8eb5a02e-a49a-08bd-83ce-6a185fe4a36e-5fe4a36e"
      tag="div"
    >
      <_Builtin.Block
        className={`table-cell ${_activeStyleVariant}`}
        id="w-node-_8eb5a02e-a49a-08bd-83ce-6a185fe4a36f-5fe4a36e"
        tag="div"
      >
        <_Builtin.Image
          className={`ui_icon_40 ${_activeStyleVariant}`}
          loading="lazy"
          width="auto"
          height="auto"
          alt=""
          src={devicesTypeIcon}
        />
      </_Builtin.Block>
      <_Builtin.Block
        className={`table-cell v ${_activeStyleVariant}`}
        id="w-node-_8eb5a02e-a49a-08bd-83ce-6a185fe4a371-5fe4a36e"
        tag="div"
      >
        <_Builtin.Block
          className={`text-medium bold ${_activeStyleVariant}`}
          id="w-node-ca88ab30-67de-feec-fa8b-788e821ffa8e-5fe4a36e"
          tag="div"
        >
          {devicesBrandAndModel}
        </_Builtin.Block>
        <_Builtin.Block
          className={`text-small ${_activeStyleVariant}`}
          id="w-node-_8eb5a02e-a49a-08bd-83ce-6a185fe4a376-5fe4a36e"
          tag="div"
        >
          {devicesDepartmentOrContact}
        </_Builtin.Block>
        <_Builtin.Block
          className={`text-medium blue ${_activeStyleVariant}`}
          id="w-node-_8eb5a02e-a49a-08bd-83ce-6a185fe4a378-5fe4a36e"
          tag="div"
        >
          {devicesItemIdFormatted}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={`status-box small ${_activeStyleVariant}`}
        id="w-node-_8eb5a02e-a49a-08bd-83ce-6a185fe4a37a-5fe4a36e"
        tag="div"
      >
        <_Builtin.Block className={`list ${_activeStyleVariant}`} tag="div">
          <_Builtin.Block
            id="w-node-_8eb5a02e-a49a-08bd-83ce-6a185fe4a37c-5fe4a36e"
            tag="div"
          >
            {devicesNextMaintenanceText}
          </_Builtin.Block>
          <_Builtin.Block
            className={`spacer_05_rem ${_activeStyleVariant}`}
            id="w-node-_8eb5a02e-a49a-08bd-83ce-6a185fe4a37e-5fe4a36e"
            tag="div"
          />
          <_Builtin.Block
            className={`wrapper-h-space-between ${_activeStyleVariant}`}
            id="w-node-_8eb5a02e-a49a-08bd-83ce-6a185fe4a37f-5fe4a36e"
            tag="div"
          >
            <_Builtin.Block
              className={`progress-wrapper ${_activeStyleVariant}`}
              id="w-node-_8eb5a02e-a49a-08bd-83ce-6a185fe4a380-5fe4a36e"
              tag="div"
            >
              <_Builtin.Block
                className={`progress-bar ${_activeStyleVariant}`}
                tag="div"
                {...devicesProgressBar}
              />
            </_Builtin.Block>
            {devicesRemainingDaysToNextMaintenanceVisibility ? (
              <_Builtin.Block
                className={`days-text ${_activeStyleVariant}`}
                tag="div"
              >
                {remainingDaysToNextMaintenance}
              </_Builtin.Block>
            ) : null}
            {devicesRequestMaintenanceVisbility ? (
              <_Builtin.Link
                className={`button-action ${_activeStyleVariant}`}
                button={true}
                block=""
                options={devicesRequestMaintenance}
              >
                {"Solicitar"}
              </_Builtin.Link>
            ) : null}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={`table-cell hr ${_activeStyleVariant}`}
        id="w-node-_8eb5a02e-a49a-08bd-83ce-6a185fe4a384-5fe4a36e"
        tag="div"
      >
        <_Builtin.Block
          className={`status-badge ${_activeStyleVariant}`}
          tag="div"
        >
          <_Builtin.Block tag="div">{devicesStatusText}</_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
