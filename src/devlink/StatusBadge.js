"use client";
import React from "react";
import * as _Builtin from "./_Builtin";

export function StatusBadge({
  as: _Component = _Builtin.Block,
  variant = "Base",
  statusTitle = "status",
}) {
  const _styleVariantMap = {
    Base: "",
    positive: "w-variant-824a6568-7f8c-894f-f3c5-c73830911759",
    negative: "w-variant-76970844-8757-710b-d0f7-95d050612eb6",
  };

  const _activeStyleVariant = _styleVariantMap[variant];
  return (
    <_Component className={`status_badge ${_activeStyleVariant}`} tag="div">
      <_Builtin.Block tag="div">{statusTitle}</_Builtin.Block>
    </_Component>
  );
}
