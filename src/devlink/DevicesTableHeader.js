"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { TableHeaderCell } from "./TableHeaderCell";

export function DevicesTableHeader({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className="table_row_2 header" tag="div">
      <TableHeaderCell variant="2down" cellTitle="Tipo" />
      <TableHeaderCell variant="2down" cellTitle="Marca y modelo" />
      <TableHeaderCell variant="down" cellTitle="Proximo mantenimiento" />
      <TableHeaderCell variant="down" cellTitle="Status" />
    </_Component>
  );
}
