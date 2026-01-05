"use client";
import React from "react";
import * as _Builtin from "./_Builtin";

export function ProgressBar({
  as: _Component = _Builtin.Block,
  variant = "Base",
}) {
  const _styleVariantMap = {
    Base: "",
    positive: "w-variant-1a6a6d7f-6261-1164-f75e-8c94bd9b84e1",
    negative: "w-variant-a4c0d284-b693-e150-432b-15446da6fafa",
  };

  const _activeStyleVariant = _styleVariantMap[variant];
  return (
    <_Component className={`progress_wrapper ${_activeStyleVariant}`} tag="div">
      <_Builtin.Block
        className={`progress_bar ${_activeStyleVariant}`}
        tag="div"
      />
    </_Component>
  );
}
