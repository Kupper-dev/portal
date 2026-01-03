"use client";
import React from "react";
import * as _Builtin from "./_Builtin";

export function Sidebar({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className="sidebar" tag="div">
      <_Builtin.Block className="sidebar_header" tag="div">
        <_Builtin.Block className="sidebar_top" tag="div">
          <_Builtin.Block className="hide_text" tag="div">
            <_Builtin.Image
              className="logo"
              loading="lazy"
              width="auto"
              height="auto"
              alt=""
              src="https://cdn.prod.website-files.com/68d88947f902d5546e5fd07a/68d892b2385a8d51601da0ab_0ec971c75107842fc0678e0fb9a2b4ad_Logo%202026.svg"
            />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className="sidebar_links" tag="div">
        <_Builtin.Link
          className="sidebar_link"
          button={false}
          id="dashboard"
          block="inline"
          options={{
            href: "https://kupper-34ef94.webflow.io/app",
          }}
        >
          <_Builtin.Block className="square" tag="div">
            <_Builtin.Image
              className="sidebar_icon"
              loading="lazy"
              width="auto"
              height="auto"
              alt=""
              src="https://cdn.prod.website-files.com/68d88947f902d5546e5fd07a/68d89975cf005d4f005eaf26_2a9666290f2f559d7b0e5c632fe882f9_Dashboard.svg"
            />
          </_Builtin.Block>
          <_Builtin.Block className="hide_text" tag="div">
            <_Builtin.Block tag="div">{"Dashboard"}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Link>
        <_Builtin.Link
          className="sidebar_link"
          button={false}
          id="services"
          block="inline"
          options={{
            href: "#",
          }}
        >
          <_Builtin.Block className="square" tag="div">
            <_Builtin.Image
              loading="lazy"
              width="auto"
              height="auto"
              alt=""
              src="https://cdn.prod.website-files.com/68d88947f902d5546e5fd07a/68d899756ce93d624296fa20_Services%20Mini.svg"
            />
          </_Builtin.Block>
          <_Builtin.Block className="hide_text" tag="div">
            <_Builtin.Block tag="div">{"Servicios"}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Link>
        <_Builtin.Link
          className="sidebar_link"
          button={false}
          id="warranties"
          block="inline"
          options={{
            href: "#",
          }}
        >
          <_Builtin.Block className="square" tag="div">
            <_Builtin.Image
              loading="lazy"
              width="auto"
              height="auto"
              alt=""
              src="https://cdn.prod.website-files.com/68d88947f902d5546e5fd07a/68d899756c4e9b3ac03a87e4_Warranty.svg"
            />
          </_Builtin.Block>
          <_Builtin.Block className="hide_text" tag="div">
            <_Builtin.Block tag="div">{"Garantias"}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Link>
        <_Builtin.Link
          className="sidebar_link"
          button={false}
          id="devices"
          block="inline"
          options={{
            href: "#",
          }}
        >
          <_Builtin.Block className="square" tag="div">
            <_Builtin.Image
              loading="lazy"
              width="auto"
              height="auto"
              alt=""
              src="https://cdn.prod.website-files.com/68d88947f902d5546e5fd07a/68d89975253ca958e65b71a8_Devices.svg"
            />
          </_Builtin.Block>
          <_Builtin.Block className="hide_text" tag="div">
            <_Builtin.Block tag="div">{"Dispositivos"}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Link>
        <_Builtin.Link
          className="sidebar_link"
          button={false}
          id="approvals"
          block="inline"
          options={{
            href: "#",
          }}
        >
          <_Builtin.Block className="square" tag="div">
            <_Builtin.Image
              loading="lazy"
              width="auto"
              height="auto"
              alt=""
              src="https://cdn.prod.website-files.com/68d88947f902d5546e5fd07a/69593bcacae3e2f32468687b_price_chec.svg"
            />
          </_Builtin.Block>
          <_Builtin.Block className="hide_text" tag="div">
            <_Builtin.Block tag="div">{"Aprobaciones"}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Link>
        <_Builtin.Link
          className="sidebar_link"
          button={false}
          id="invoices"
          block="inline"
          options={{
            href: "#",
          }}
        >
          <_Builtin.Block className="square" tag="div">
            <_Builtin.Image
              loading="lazy"
              width="auto"
              height="auto"
              alt=""
              src="https://cdn.prod.website-files.com/68d88947f902d5546e5fd07a/68d89975a25a3ad066aa985c_405fb3806a923d7fd91bdf47a9c1204b_invoices%20.svg"
            />
          </_Builtin.Block>
          <_Builtin.Block className="hide_text" tag="div">
            <_Builtin.Block tag="div">{"Facturas"}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Link>
      </_Builtin.Block>
      <_Builtin.Block className="sidebar_footer" tag="div">
        <_Builtin.Block className="mini_ad vertical" tag="div">
          <_Builtin.Block
            className="vertical"
            id="w-node-_8fbc53b0-423e-d8c4-831c-9bc7c8be43eb-c8be43bd"
            tag="div"
          >
            <_Builtin.Block tag="div">
              {"¿Quieres vender tu computadora?"}
            </_Builtin.Block>
            <_Builtin.Link
              className="dashboard_button"
              button={true}
              block=""
              options={{
                href: "#",
              }}
            >
              {"Más información"}
            </_Builtin.Link>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
