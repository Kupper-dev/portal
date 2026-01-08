"use client";
import React from "react";
import * as _Builtin from "./_Builtin";

export function ExtendedDetails({
  as: _Component = _Builtin.Block,
  title = "Title",
  subtitle = "Subtitle",
}) {
  return (
    <_Component className="list" tag="div">
      <_Builtin.Block className="item-text-detail black" tag="div">
        {title}
      </_Builtin.Block>
      <_Builtin.Block className="item-text-detail" tag="div">
        {subtitle}
      </_Builtin.Block>
      <_Builtin.Block className="spacer_1_rem" tag="div" />
    </_Component>
  );
}
