"use client";
import React from "react";
import * as _Builtin from "./_Builtin";

export function ComplementaryTable({
  as: _Component = _Builtin.Block,
  variant = "Base",
  complementaryRequestedBy = "Nombre y apellido",
  complementaryPriceOfRequest = "$ MXN",
  complementaryItemIdFormatted = "R0000",

  complementaryDetailsOfRequest = {
    href: "#",
  },

  complementaryRequestDate = "00/00/00",

  requestAction = {
    href: "#",
  },

  complementaryRequestActionText = "Action",
}) {
  const _styleVariantMap = {
    Base: "",
    Positive: "w-variant-d0f8356a-450b-a1f0-ffa1-65e345da882c",
  };

  const _activeStyleVariant = _styleVariantMap[variant];

  return (
    <_Component
      className={`table-row complementary ${_activeStyleVariant}`}
      id="w-node-eacd24f2-3308-569b-e5e7-efe9e041d4e0-e041d4e0"
      tag="div"
    >
      <_Builtin.Block
        className={`table-cell v ${_activeStyleVariant}`}
        tag="div"
      >
        <_Builtin.Block
          className={`text-medium bold ${_activeStyleVariant}`}
          id="w-node-a6bdb14b-9874-5f5f-299e-8581cbb70f6a-e041d4e0"
          tag="div"
        >
          {complementaryRequestedBy}
        </_Builtin.Block>
        <_Builtin.Block
          className={`text-small ${_activeStyleVariant}`}
          id="w-node-eacd24f2-3308-569b-e5e7-efe9e041d4e6-e041d4e0"
          tag="div"
        >
          {complementaryPriceOfRequest}
        </_Builtin.Block>
        <_Builtin.Block
          className={`text-medium blue ${_activeStyleVariant}`}
          id="w-node-eacd24f2-3308-569b-e5e7-efe9e041d4e8-e041d4e0"
          tag="div"
        >
          {complementaryItemIdFormatted}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={`table-cell hr ${_activeStyleVariant}`}
        id="w-node-eacd24f2-3308-569b-e5e7-efe9e041d4ea-e041d4e0"
        tag="div"
      >
        <_Builtin.Link
          className={`text-small blue ${_activeStyleVariant}`}
          id="w-node-eacd24f2-3308-569b-e5e7-efe9e041d4eb-e041d4e0"
          button={false}
          block=""
          options={complementaryDetailsOfRequest}
        >
          {"Ver item ↗"}
        </_Builtin.Link>
      </_Builtin.Block>
      <_Builtin.Block
        className={`table-cell hr m ${_activeStyleVariant}`}
        id="w-node-eacd24f2-3308-569b-e5e7-efe9e041d4ed-e041d4e0"
        tag="div"
      >
        <_Builtin.Block
          className={`text-small ${_activeStyleVariant}`}
          id="w-node-eacd24f2-3308-569b-e5e7-efe9e041d4ee-e041d4e0"
          tag="div"
        >
          {complementaryRequestDate}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={`table-cell hr ${_activeStyleVariant}`}
        id="w-node-eacd24f2-3308-569b-e5e7-efe9e041d4f0-e041d4e0"
        tag="div"
      >
        <_Builtin.Link
          className={`button-action ${_activeStyleVariant}`}
          button={true}
          block=""
          options={requestAction}
        >
          {complementaryRequestActionText}
        </_Builtin.Link>
      </_Builtin.Block>
    </_Component>
  );
}
