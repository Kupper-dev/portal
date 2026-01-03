"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { TableHeaderRow } from "./TableHeaderRow";
import { TableBodyRow } from "./TableBodyRow";
import { TablePagination } from "./TablePagination";

export function TableContainer({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className="table" tag="div">
      <TableHeaderRow />
      <TableBodyRow variant="status finished" />
      <TablePagination />
    </_Component>
  );
}
