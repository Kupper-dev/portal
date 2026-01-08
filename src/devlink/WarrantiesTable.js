"use client";
import React from "react";
import * as _Builtin from "./_Builtin";

export function WarrantiesTable({
  as: _Component = _Builtin.Block,
  variant = "Base",
  warrantiesItemTitle = "Title sanitized",
  warrantiesDetails = "Serial Number",
  warrantiesQuantity = "1",
  warrantiesWarrantyPeriod = "1 Año",
  warrantiesStatusText = "Status",
  warrantiesWarrantyValidity = (
    <>
      {"363 días"}
      <br />
    </>
  ),
}) {
  const _styleVariantMap = {
    Base: "",
    Positive: "w-variant-cd16bd4b-662b-539f-b967-0e567a2830de",
    Warning: "w-variant-2978c888-c8ae-319b-fe0f-2446434199cc",
    Negative: "w-variant-7c8d58a1-3c02-987a-3f38-1f94a7ca2f04",
    Archived: "w-variant-557cfdc4-522f-fe01-184f-6e5954737948",
  };

  const _activeStyleVariant = _styleVariantMap[variant];

  return (
    <_Component
      className={`table-row warranties ${_activeStyleVariant}`}
      id="w-node-_8c73c838-629d-012f-5faf-90336762f0b5-6762f0b5"
      tag="div"
    >
      <_Builtin.Block
        className={`table-cell ${_activeStyleVariant}`}
        id="w-node-_8c73c838-629d-012f-5faf-90336762f0b6-6762f0b5"
        tag="div"
      >
        <_Builtin.Block
          className={`text-medium bold ${_activeStyleVariant}`}
          id="w-node-c2389378-f06b-6f41-8812-0f38f0011a82-6762f0b5"
          tag="div"
        >
          {warrantiesItemTitle}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={`table-cell hr m ${_activeStyleVariant}`}
        id="w-node-_8c73c838-629d-012f-5faf-90336762f0bb-6762f0b5"
        tag="div"
      >
        <_Builtin.Block
          className={`text-small ${_activeStyleVariant}`}
          id="w-node-_8c73c838-629d-012f-5faf-90336762f0bc-6762f0b5"
          tag="div"
        >
          {warrantiesDetails}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={`table-cell hr mid ${_activeStyleVariant}`}
        id="w-node-_8c73c838-629d-012f-5faf-90336762f0bf-6762f0b5"
        tag="div"
      >
        <_Builtin.Block
          className={`text-small ${_activeStyleVariant}`}
          id="w-node-_8c73c838-629d-012f-5faf-90336762f0c0-6762f0b5"
          tag="div"
        >
          {warrantiesQuantity}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={`table-cell hr ${_activeStyleVariant}`}
        id="w-node-_8c73c838-629d-012f-5faf-90336762f0c2-6762f0b5"
        tag="div"
      >
        <_Builtin.Block
          className={`text-small ${_activeStyleVariant}`}
          id="w-node-_8c73c838-629d-012f-5faf-90336762f0c3-6762f0b5"
          tag="div"
        >
          {warrantiesWarrantyPeriod}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={`table-cell hr ${_activeStyleVariant}`}
        id="w-node-_8c73c838-629d-012f-5faf-90336762f0c5-6762f0b5"
        tag="div"
      >
        <_Builtin.Block
          className={`status-badge ${_activeStyleVariant}`}
          tag="div"
        >
          <_Builtin.Block tag="div">{warrantiesStatusText}</_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={`table-cell hr m ${_activeStyleVariant}`}
        id="w-node-_8c73c838-629d-012f-5faf-90336762f0c9-6762f0b5"
        tag="div"
      >
        <_Builtin.Block
          className={`text-small blue ${_activeStyleVariant}`}
          id="w-node-_8c73c838-629d-012f-5faf-90336762f0ca-6762f0b5"
          tag="div"
        >
          {warrantiesWarrantyValidity}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
