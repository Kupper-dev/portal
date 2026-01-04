"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { StatusBadge } from "./StatusBadge";

export function TableWarranties({
  as: _Component = _Builtin.Block,
  warrantiesItemDescription = "Descripción del item",
  warrantiesItemQuantity = "1",
  warrantiesItemWarranty = "Garantía",
  statusBadgeStatusTitle = "Inactiva",
  statusBadgeItemStatusBadgeVariant = null,
  warrantiesItemValidity = "00/00/00",
  warrantiesItemObservations = "-",
}) {
  return (
    <_Component className="table" tag="div">
      <_Builtin.Block className="table_row_1" tag="div">
        <_Builtin.Block
          className="table_cell"
          id="w-node-_679bb353-22ee-ce77-1d01-9e60d8e99f71-d8e99f62"
          tag="div"
        >
          <_Builtin.Block tag="div">{warrantiesItemDescription}</_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className="table_cell"
          id="w-node-_679bb353-22ee-ce77-1d01-9e60d8e99f74-d8e99f62"
          tag="div"
        >
          <_Builtin.Block tag="div">
            {warrantiesItemObservations}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className="table_cell h"
          id="w-node-_679bb353-22ee-ce77-1d01-9e60d8e99f77-d8e99f62"
          tag="div"
        >
          <_Builtin.Block tag="div">{warrantiesItemQuantity}</_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className="table_cell h"
          id="w-node-_679bb353-22ee-ce77-1d01-9e60d8e99f7a-d8e99f62"
          tag="div"
        >
          <_Builtin.Block tag="div">{warrantiesItemWarranty}</_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className="table_cell h no"
          id="w-node-_679bb353-22ee-ce77-1d01-9e60d8e99f7d-d8e99f62"
          tag="div"
        >
          <StatusBadge
            variant={statusBadgeItemStatusBadgeVariant}
            statusTitle={statusBadgeStatusTitle}
          />
        </_Builtin.Block>
        <_Builtin.Block
          className="table_cell h"
          id="w-node-_679bb353-22ee-ce77-1d01-9e60d8e99f80-d8e99f62"
          tag="div"
        >
          <_Builtin.Block tag="div">{warrantiesItemValidity}</_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
