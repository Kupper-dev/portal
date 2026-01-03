"use client";
import React from "react";
import * as _Builtin from "./_Builtin";

export function TableHeaderCell({
  as: _Component = _Builtin.Block,
  variant = "Base",
  cellTitle = "status",
}) {
  const _styleVariantMap = {
    Base: "",
    up: "w-variant-d657ca9f-55c5-12e3-5c11-7e109e61dd79",
    down: "w-variant-1b3d8cc8-bbcf-ad51-c6d9-6743cb443ee6",
  };

  const _activeStyleVariant = _styleVariantMap[variant];

  return (
    <_Component
      className={`table_cell h ${_activeStyleVariant}`}
      id="w-node-_605b32d7-cd84-1e56-467a-f6fea90a1136-a90a1136"
      tag="div"
    >
      <_Builtin.Block tag="div">{cellTitle}</_Builtin.Block>
      <_Builtin.Image
        className={`ui_icon_20 ${_activeStyleVariant}`}
        loading="lazy"
        width="auto"
        height="auto"
        alt=""
        src="https://cdn.prod.website-files.com/68d88947f902d5546e5fd07a/695753ce9e48b631d8c05a69_arrow_down.svg"
      />
    </_Component>
  );
}
