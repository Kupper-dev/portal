"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { TableDevices } from "./TableDevices";
import { ServicesTable } from "./ServicesTable";
import { WarrantiesTable } from "./WarrantiesTable";
import { ComplementaryTable } from "./ComplementaryTable";

export function MainStructure({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className="main-wrapper hidden" tag="div">
      <_Builtin.Block className="sidepanel is-expanded" tag="div">
        <_Builtin.Block className="sidepanel-content" tag="div">
          <_Builtin.Block className="panel-layer-base" tag="div">
            <_Builtin.Block className="sidepanel-header" tag="div" />
          </_Builtin.Block>
          <_Builtin.Block className="panel-layer-extended" tag="div" />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className="sidepanel-overlay" tag="div" />
      <_Builtin.Block className="module" tag="div">
        <_Builtin.Block className="page-table" tag="div">
          <_Builtin.Block className="list" tag="div">
            <TableDevices variant="Positive" />
            <ServicesTable variant="Positive" />
            <WarrantiesTable variant="Negative" />
            <ComplementaryTable />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
