"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { TableHeaderCell } from "./TableHeaderCell";

export function WarrantiesTableHeader({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className="table_row_1 header" tag="div">
      <TableHeaderCell variant="2down" cellTitle="Descripción" />
      <TableHeaderCell variant="2down" cellTitle="Observaciones" />
      <TableHeaderCell variant="down" cellTitle="Cant" />
      <TableHeaderCell variant="down" cellTitle="Garantía" />
      <TableHeaderCell variant="down" cellTitle="Status" />
      <TableHeaderCell variant="down" cellTitle="Vigencia" />
    </_Component>
  );
}
