"use client";
import React from "react";
import * as _Builtin from "./_Builtin";

export function ProgressBar({
  as: _Component = _Builtin.Block,
  variant = "Base",
  progressbar = {},

  requestMaintenance = {
    href: "#",
  },
}) {
  const _styleVariantMap = {
    Base: "",
    positive: "w-variant-1a6a6d7f-6261-1164-f75e-8c94bd9b84e1",
    negative: "w-variant-a4c0d284-b693-e150-432b-15446da6fafa",
    "no-maintenance": "w-variant-e82b3dc5-ad80-5338-db21-9cf6140f7cc2",
  };

  const _activeStyleVariant = _styleVariantMap[variant];

  return (
    <_Component className={`progress_wrapper ${_activeStyleVariant}`} tag="div">
      <_Builtin.Block
        className={`progressbar-text ${_activeStyleVariant}`}
        tag="div"
      >
        {"Sin mantenimiento.. "}
        <_Builtin.Link
          className={`dashboard_link ${_activeStyleVariant}`}
          button={false}
          block=""
          options={requestMaintenance}
        >
          {"Solicitar"}
        </_Builtin.Link>
      </_Builtin.Block>
      <_Builtin.Block
        className={`progress_bar ${_activeStyleVariant}`}
        tag="div"
        {...progressbar}
      />
    </_Component>
  );
}
