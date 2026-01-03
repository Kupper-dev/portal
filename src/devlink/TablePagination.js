"use client";
import React from "react";
import * as _Builtin from "./_Builtin";

export function TablePagination({
  as: _Component = _Builtin.Block,

  anterior = {
    href: "#",
  },

  siguiente = {
    href: "#",
  },

  paginationCountFirst = {
    href: "#",
  },

  paginationPaginationCountSecondVisibility = true,

  paginationPaginationCountThird = {
    href: "#",
  },

  paginationPaginationCountThirdVisibility = true,

  paginationPaginationCountLast = {
    href: "#",
  },

  paginationPaginationCountLastVisibility = true,

  paginationPaginationCountSecond = {
    href: "#",
  },
}) {
  return (
    <_Component className="table_footer" tag="div">
      <_Builtin.Link
        className="dashboard_button"
        button={true}
        block=""
        options={anterior}
      >
        {"Anterior"}
      </_Builtin.Link>
      <_Builtin.Block className="spacer_h_1rem" tag="div" />
      <_Builtin.Link
        className="pagination_number"
        button={false}
        block="inline"
        options={paginationCountFirst}
      >
        <_Builtin.Block tag="div">{"1"}</_Builtin.Block>
      </_Builtin.Link>
      {paginationPaginationCountSecondVisibility ? (
        <_Builtin.Link
          className="pagination_number"
          button={false}
          block="inline"
          options={paginationPaginationCountSecond}
        >
          <_Builtin.Block tag="div">{"1"}</_Builtin.Block>
        </_Builtin.Link>
      ) : null}
      {paginationPaginationCountThirdVisibility ? (
        <_Builtin.Link
          className="pagination_number"
          button={false}
          block="inline"
          options={paginationPaginationCountThird}
        >
          <_Builtin.Block tag="div">{"1"}</_Builtin.Block>
        </_Builtin.Link>
      ) : null}
      <_Builtin.Block tag="div">{"..."}</_Builtin.Block>
      {paginationPaginationCountLastVisibility ? (
        <_Builtin.Link
          className="pagination_number"
          button={false}
          block="inline"
          options={paginationPaginationCountLast}
        >
          <_Builtin.Block tag="div">{"1"}</_Builtin.Block>
        </_Builtin.Link>
      ) : null}
      <_Builtin.Block className="spacer_h_1rem" tag="div" />
      <_Builtin.Link
        className="dashboard_button"
        button={true}
        block=""
        options={siguiente}
      >
        {"Siguiente"}
      </_Builtin.Link>
    </_Component>
  );
}
