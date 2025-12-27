"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";

const _interactionsData = JSON.parse(
  '{"events":{"e":{"id":"e","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-2"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"8fbc53b0-423e-d8c4-831c-9bc7c8be43c2","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"8fbc53b0-423e-d8c4-831c-9bc7c8be43c2","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1759027149168},"e-2":{"id":"e-2","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-2","affectedElements":{},"playInReverse":false,"autoStopEventId":"e"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"8fbc53b0-423e-d8c4-831c-9bc7c8be43c2","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"8fbc53b0-423e-d8c4-831c-9bc7c8be43c2","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1759027149169}},"actionLists":{"a":{"id":"a","title":"Sidebar","actionItemGroups":[{"actionItems":[{"id":"a-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"PARENT","selector":".sidebar","selectorGuids":["07bea470-5221-a62c-ee40-b4f2a25760bf"]},"widthValue":14,"heightValue":100,"widthUnit":"rem","heightUnit":"%","locked":false}}]},{"actionItems":[{"id":"a-n-2","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"outQuint","duration":400,"target":{"useEventTarget":"PARENT","selector":".sidebar","selectorGuids":["07bea470-5221-a62c-ee40-b4f2a25760bf"]},"widthValue":4.6,"heightValue":100,"widthUnit":"rem","heightUnit":"%","locked":false}},{"id":"a-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".mini_ad.vertical","selectorGuids":["0897b501-0e1e-1d21-3f2b-1762fef802ef","a2329353-f697-2613-284c-0b329be8f954"]},"value":"none"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1759027156245},"a-2":{"id":"a-2","title":"Sidebar close","actionItemGroups":[{"actionItems":[{"id":"a-2-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"outQuint","duration":500,"target":{"useEventTarget":"PARENT","selector":".sidebar","selectorGuids":["07bea470-5221-a62c-ee40-b4f2a25760bf"]},"widthValue":14,"heightValue":100,"widthUnit":"rem","heightUnit":"%","locked":false}},{"id":"a-2-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"selector":".mini_ad.vertical","selectorGuids":["0897b501-0e1e-1d21-3f2b-1762fef802ef","a2329353-f697-2613-284c-0b329be8f954"]},"value":"grid"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1759027348520}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function Sidebar({ as: _Component = _Builtin.Block }) {
  _interactions.useInteractions(_interactionsData);

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
          <_Builtin.Link
            className="square"
            data-w-id="8fbc53b0-423e-d8c4-831c-9bc7c8be43c2"
            button={false}
            block="inline"
            options={{
              href: "#",
            }}
          >
            <_Builtin.NotSupported _atom="Animation" />
          </_Builtin.Link>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className="sidebar_links" tag="div">
        <_Builtin.Link
          className="sidebar_link"
          button={false}
          id="dashboard"
          block="inline"
          options={{
            href: "#",
          }}
        >
          <_Builtin.Block className="square" tag="div">
            <_Builtin.Image
              className="sidebar_icon"
              loading="lazy"
              width="auto"
              height="auto"
              alt=""
              src="https://cdn.prod.website-files.com/68d88947f902d5546e5fd07a/68d89975cf005d4f005eaf26_08c589973aab234e316c0fa6ccf7715d_Dashboard.svg"
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
              src="https://cdn.prod.website-files.com/68d88947f902d5546e5fd07a/68d89975a25a3ad066aa985c_405fb3806a923d7fd91bdf47a9c1204b_invoices%20.svg"
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
