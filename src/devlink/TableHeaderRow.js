"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { TableHeaderCell } from "./TableHeaderCell";

export function TableHeaderRow({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className="table_body_row header" tag="div">
      <_Builtin.Block
        className="table_cell"
        id="w-node-_23c0bceb-c98e-687f-00c3-b3817811a277-7811a276"
        tag="div"
      >
        <_Builtin.Block tag="div">{"Servicio"}</_Builtin.Block>
      </_Builtin.Block>
      <TableHeaderCell variant="down" cellTitle="Status" />
      <TableHeaderCell variant="down" cellTitle="Fecha" />
      <TableHeaderCell variant="down" cellTitle="Resolución estimada" />
    </_Component>
  );
}
