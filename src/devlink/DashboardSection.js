"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Sidebar } from "./Sidebar";
import { MiniAds } from "./MiniAds";
import { ServicesDetailsAndStatus } from "./ServicesDetailsAndStatus";

export function DashboardSection({ as: _Component = _Builtin.Section }) {
  return (
    <_Component
      className="dashboard_section"
      grid={{
        type: "section",
      }}
      tag="section"
    >
      <Sidebar />
      <_Builtin.Block className="content" tag="div">
        <_Builtin.Block className="header" tag="div">
          <_Builtin.DropdownWrapper
            className="avatar"
            tag="div"
            delay={0}
            hover={false}
          >
            <_Builtin.DropdownToggle className="avatar_dropdown" tag="div" />
            <_Builtin.DropdownList className="dropdown-list" tag="nav">
              <_Builtin.DropdownLink
                className="test_link"
                options={{
                  href: "#",
                }}
              >
                {"Link 1"}
              </_Builtin.DropdownLink>
              <_Builtin.DropdownLink
                options={{
                  href: "#",
                }}
              >
                {"Link 2"}
              </_Builtin.DropdownLink>
              <_Builtin.DropdownLink
                options={{
                  href: "#",
                }}
              >
                {"Link 3"}
              </_Builtin.DropdownLink>
            </_Builtin.DropdownList>
          </_Builtin.DropdownWrapper>
        </_Builtin.Block>
        <_Builtin.Block className="dashboard_bg" tag="div">
          <_Builtin.Image
            className="hero_image"
            loading="lazy"
            width="auto"
            height="auto"
            alt=""
            src="https://cdn.prod.website-files.com/68d88947f902d5546e5fd07a/68d8ab4d19a030bafad06999_Dragonfly_4.png"
          />
        </_Builtin.Block>
        <_Builtin.Grid className="main-grid" tag="div">
          <_Builtin.Block
            className="dashboard_hero"
            id="w-node-_9a29b546-1c4d-9281-085e-e86e7c1bffe5-7c1bffd5"
            tag="div"
          >
            <_Builtin.Block className="hero_info_wraper" tag="div">
              <_Builtin.Block tag="div">
                <_Builtin.Block className="hero_title" tag="div">
                  {"Hola "}
                </_Builtin.Block>
                <_Builtin.Block
                  className="hero_title gradient_text"
                  tag="div"
                  id="user-first-name"
                >
                  {"Diego"}
                </_Builtin.Block>
                <_Builtin.Block tag="div">
                  {"¿Que quieres reparar el día de hoy?"}
                  <br />
                  {"‍"}
                </_Builtin.Block>
                <_Builtin.Block
                  className="wrapper_flex_h_space_between max_16rem"
                  tag="div"
                >
                  <_Builtin.Link
                    className="dashboard_link"
                    button={false}
                    block=""
                    options={{
                      href: "#",
                    }}
                  >
                    {"Solicitar ayuda tecnica "}
                  </_Builtin.Link>
                  <_Builtin.Link
                    className="dashboard_button"
                    button={true}
                    block=""
                    options={{
                      href: "#",
                    }}
                  >
                    {"Solicitar servicio"}
                  </_Builtin.Link>
                </_Builtin.Block>
              </_Builtin.Block>
              <MiniAds />
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className="spacer_2_rem"
            id="w-node-_9a29b546-1c4d-9281-085e-e86e7c1bfff6-7c1bffd5"
            tag="div"
          />
          <ServicesDetailsAndStatus />
          <_Builtin.Grid
            className="_1-2-grid"
            id="w-node-_9a29b546-1c4d-9281-085e-e86e7c1bfff8-7c1bffd5"
            tag="div"
          >
            <_Builtin.Block className="module" tag="div">
              <_Builtin.Block className="card_header" tag="div">
                <_Builtin.Heading tag="h4">
                  {"Tu plan este més"}
                </_Builtin.Heading>
              </_Builtin.Block>
              <_Builtin.Grid className="_2_row_table" tag="div">
                <_Builtin.Block
                  id="w-node-_9a29b546-1c4d-9281-085e-e86e7c1bfffe-7c1bffd5"
                  tag="div"
                >
                  {"Visitas disponibles:"}
                </_Builtin.Block>
                <_Builtin.Block
                  id="w-node-_9a29b546-1c4d-9281-085e-e86e7c1c0000-7c1bffd5"
                  tag="div"
                >
                  {"3 visitas"}
                </_Builtin.Block>
              </_Builtin.Grid>
              <_Builtin.Grid className="_2_row_table" tag="div">
                <_Builtin.Block
                  id="w-node-_9a29b546-1c4d-9281-085e-e86e7c1c0003-7c1bffd5"
                  tag="div"
                >
                  {"Soporte remoto disponible:"}
                </_Builtin.Block>
                <_Builtin.Block
                  id="w-node-_9a29b546-1c4d-9281-085e-e86e7c1c0005-7c1bffd5"
                  tag="div"
                >
                  {"6 Horas 20 min"}
                </_Builtin.Block>
              </_Builtin.Grid>
              <_Builtin.Grid className="_2_row_table" tag="div">
                <_Builtin.Block
                  id="w-node-_9a29b546-1c4d-9281-085e-e86e7c1c0008-7c1bffd5"
                  tag="div"
                >
                  {"Compras"}
                </_Builtin.Block>
                <_Builtin.Block
                  id="w-node-_9a29b546-1c4d-9281-085e-e86e7c1c000a-7c1bffd5"
                  tag="div"
                >
                  {"3 visitas"}
                </_Builtin.Block>
              </_Builtin.Grid>
            </_Builtin.Block>
            <_Builtin.Block className="module" tag="div">
              <_Builtin.Block className="card_header" tag="div">
                <_Builtin.Heading tag="h4">
                  {"Servicios pendientes"}
                </_Builtin.Heading>
              </_Builtin.Block>
              <_Builtin.Link
                className="projects-list first"
                button={false}
                block="inline"
                options={{
                  href: "#",
                }}
              >
                <_Builtin.Block className="project-list-logo" tag="div">
                  <_Builtin.Image
                    className="list_icon"
                    width="auto"
                    height="auto"
                    loading="lazy"
                    alt=""
                    src="https://cdn.prod.website-files.com/68d88947f902d5546e5fd07a/68d899756ce93d624296fa20_Services%20Mini.svg"
                  />
                  <_Builtin.Block tag="div">
                    <_Builtin.Heading className="no-space-bottom" tag="h6">
                      {"Hp 14-DK001LA"}
                    </_Builtin.Heading>
                    <_Builtin.Block className="small_text text_gray" tag="div">
                      {"Solicitado en: 20 Agosto 2025"}
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block className="small-link" tag="div">
                  {"Ver Ticket"}
                </_Builtin.Block>
              </_Builtin.Link>
            </_Builtin.Block>
          </_Builtin.Grid>
          <_Builtin.Block
            className="table-module"
            id="w-node-_9a29b546-1c4d-9281-085e-e86e7c1c001a-7c1bffd5"
            tag="div"
          >
            <_Builtin.Block className="table-header" tag="div">
              <_Builtin.Heading className="no-space-bottom" tag="h4">
                {"Ultimas solicitudes"}
              </_Builtin.Heading>
            </_Builtin.Block>
            <_Builtin.Block className="table-content" tag="div">
              <_Builtin.Block className="table-list" tag="div" />
            </_Builtin.Block>
            <_Builtin.Block className="table-bottom-caption" tag="div">
              <_Builtin.Block tag="div">{"Prop Text"}</_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Grid>
      </_Builtin.Block>
    </_Component>
  );
}
