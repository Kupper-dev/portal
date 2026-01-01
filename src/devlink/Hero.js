"use client";
import React from "react";
import * as _Builtin from "./_Builtin";

export function Hero({
  as: _Component = _Builtin.Block,
  heroRecipientName = "User",

  heroButton1 = {
    href: "#",
  },

  button1 = "Solicitar servicio",

  heroButton2 = {
    href: "#",
  },

  heroButton22 = "Agendar cita",
}) {
  return (
    <_Component className="dashboard_bg" tag="div">
      <_Builtin.Block
        className="dashboard_hero"
        id="w-node-_5a8c35be-9254-e8bc-2f34-cb4f105d90b7-105d90b6"
        tag="div"
      >
        <_Builtin.Block className="hero_info_wraper" tag="div">
          <_Builtin.Block tag="div">
            <_Builtin.Block className="hero_title" tag="div">
              {"Hola "}
            </_Builtin.Block>
            <_Builtin.Block className="hero_title gradient_text" tag="div">
              {heroRecipientName}
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
                options={heroButton2}
              >
                {heroButton22}
              </_Builtin.Link>
              <_Builtin.Link
                className="dashboard_button"
                button={true}
                block=""
                options={heroButton1}
              >
                {button1}
              </_Builtin.Link>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block className="mini_ads_wrapper" tag="div">
            <_Builtin.Block className="mini_ad" tag="div">
              <_Builtin.Block
                className="vertical"
                id="w-node-_5a8c35be-9254-e8bc-2f34-cb4f105d90c9-105d90b6"
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
              <_Builtin.Image
                id="w-node-_5a8c35be-9254-e8bc-2f34-cb4f105d90ce-105d90b6"
                width="auto"
                height="auto"
                loading="lazy"
                alt=""
                src="https://cdn.prod.website-files.com/68d88947f902d5546e5fd07a/68de1f9d6fd9064f8a768cd0_940e9ef3bfe638be7c3df1fdee595c29_Laptop%20coins.png"
              />
            </_Builtin.Block>
            <_Builtin.Block className="mini_ad _2" tag="div">
              <_Builtin.Block
                className="vertical"
                id="w-node-_5a8c35be-9254-e8bc-2f34-cb4f105d90d0-105d90b6"
                tag="div"
              >
                <_Builtin.Block tag="div">
                  {"Poliza mensual soporte para negocios"}
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
              <_Builtin.Image
                id="w-node-_5a8c35be-9254-e8bc-2f34-cb4f105d90d5-105d90b6"
                width="auto"
                height="auto"
                loading="lazy"
                alt=""
                src="https://cdn.prod.website-files.com/68d88947f902d5546e5fd07a/68e42d60646fb49aba0eaa3d_Mujer-con-laptop.png"
              />
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Image
        className="hero_image"
        width="auto"
        height="auto"
        loading="lazy"
        alt=""
        src="https://cdn.prod.website-files.com/68d88947f902d5546e5fd07a/68d8ab4d19a030bafad06999_Dragonfly_4.png"
      />
    </_Component>
  );
}
