"use client";
import React from "react";
import * as _Builtin from "./_Builtin";

export function ServicesTable({
  as: _Component = _Builtin.Block,
  variant = "Base",
  servicesTitle = "Title sanitized",
  servicesDeviceBrandAndModel = "Device brand and model",
  servicesItemIdFormatted = "S000",
  servicesDate = "29/07/26",
  servicesAproxCompletationDate = "07 ene 26, 06:00 p.m",
  servicesStatusText = "Status",
}) {
  const _styleVariantMap = {
    Base: "",
    Positive: "w-variant-c1685905-d60a-134a-17ca-de36403e2a26",
    Warning: "w-variant-48b0d94c-8401-06e4-b025-135062f7792c",
    Negative: "w-variant-01e5a98b-e42c-6a3d-9000-5bd340c39924",
  };

  const _activeStyleVariant = _styleVariantMap[variant];

  return (
    <_Component
      className={`table-row services ${_activeStyleVariant}`}
      id="w-node-_546e2e23-46d5-16f8-6c16-fee7ce40624f-ce40624f"
      tag="div"
    >
      <_Builtin.Block
        className={`table-cell v ${_activeStyleVariant}`}
        id="w-node-_546e2e23-46d5-16f8-6c16-fee7ce406250-ce40624f"
        tag="div"
      >
        <_Builtin.Block
          className={`text-medium bold ${_activeStyleVariant}`}
          id="w-node-_546e2e23-46d5-16f8-6c16-fee7ce406251-ce40624f"
          tag="div"
        >
          {servicesTitle}
        </_Builtin.Block>
        <_Builtin.Block
          className={`text-small ${_activeStyleVariant}`}
          id="w-node-_546e2e23-46d5-16f8-6c16-fee7ce406253-ce40624f"
          tag="div"
        >
          {servicesDeviceBrandAndModel}
        </_Builtin.Block>
        <_Builtin.Block
          className={`text-medium blue ${_activeStyleVariant}`}
          id="w-node-_546e2e23-46d5-16f8-6c16-fee7ce406255-ce40624f"
          tag="div"
        >
          {servicesItemIdFormatted}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={`table-cell hr ${_activeStyleVariant}`}
        id="w-node-_546e2e23-46d5-16f8-6c16-fee7ce406257-ce40624f"
        tag="div"
      >
        <_Builtin.Block
          className={`status-badge ${_activeStyleVariant}`}
          tag="div"
        >
          <_Builtin.Block tag="div">{servicesStatusText}</_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={`table-cell hr m ${_activeStyleVariant}`}
        id="w-node-_546e2e23-46d5-16f8-6c16-fee7ce40625b-ce40624f"
        tag="div"
      >
        <_Builtin.Block
          className={`text-small ${_activeStyleVariant}`}
          id="w-node-_546e2e23-46d5-16f8-6c16-fee7ce40625c-ce40624f"
          tag="div"
        >
          {servicesDate}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={`table-cell hr ${_activeStyleVariant}`}
        id="w-node-_546e2e23-46d5-16f8-6c16-fee7ce40625e-ce40624f"
        tag="div"
      >
        <_Builtin.Block
          className={`wrapper-h-right ${_activeStyleVariant}`}
          id="w-node-_546e2e23-46d5-16f8-6c16-fee7ce40625f-ce40624f"
          tag="div"
        >
          <_Builtin.Image
            className={`ui_icon_20 m ${_activeStyleVariant}`}
            loading="lazy"
            width="auto"
            height="auto"
            alt=""
            src="https://cdn.prod.website-files.com/695c194c86d5e76167047ce4/695c7603b5dc2f96c47f1ada_time%20response.svg"
          />
          <_Builtin.Block
            className={`text-small blue ${_activeStyleVariant}`}
            id="w-node-_546e2e23-46d5-16f8-6c16-fee7ce406261-ce40624f"
            tag="div"
          >
            {servicesAproxCompletationDate}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
