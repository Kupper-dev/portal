"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";

const _interactionsData = JSON.parse(
  '{"events":{"e":{"id":"e","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-2"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"8fbc53b0-423e-d8c4-831c-9bc7c8be43c2","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"8fbc53b0-423e-d8c4-831c-9bc7c8be43c2","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1759027149168},"e-2":{"id":"e-2","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-2","affectedElements":{},"playInReverse":false,"autoStopEventId":"e"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"8fbc53b0-423e-d8c4-831c-9bc7c8be43c2","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"8fbc53b0-423e-d8c4-831c-9bc7c8be43c2","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1759027149169}},"actionLists":{"a":{"id":"a","title":"Sidebar","actionItemGroups":[{"actionItems":[{"id":"a-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"PARENT","selector":".sidebar","selectorGuids":["07bea470-5221-a62c-ee40-b4f2a25760bf"]},"widthValue":14,"heightValue":100,"widthUnit":"rem","heightUnit":"%","locked":false}}]},{"actionItems":[{"id":"a-n-2","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"outQuint","duration":400,"target":{"useEventTarget":"PARENT","selector":".sidebar","selectorGuids":["07bea470-5221-a62c-ee40-b4f2a25760bf"]},"widthValue":4.6,"heightValue":100,"widthUnit":"rem","heightUnit":"%","locked":false}},{"id":"a-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".mini_ad.vertical","selectorGuids":["0897b501-0e1e-1d21-3f2b-1762fef802ef","a2329353-f697-2613-284c-0b329be8f954"]},"value":"none"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1759027156245},"a-2":{"id":"a-2","title":"Sidebar close","actionItemGroups":[{"actionItems":[{"id":"a-2-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"outQuint","duration":500,"target":{"useEventTarget":"PARENT","selector":".sidebar","selectorGuids":["07bea470-5221-a62c-ee40-b4f2a25760bf"]},"widthValue":14,"heightValue":100,"widthUnit":"rem","heightUnit":"%","locked":false}},{"id":"a-2-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"selector":".mini_ad.vertical","selectorGuids":["0897b501-0e1e-1d21-3f2b-1762fef802ef","a2329353-f697-2613-284c-0b329be8f954"]},"value":"grid"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1759027348520}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function MiniAds({ as: _Component = _Builtin.Block }) {
  _interactions.useInteractions(_interactionsData);

  return (
    <_Component className="mini_ads_wrapper" tag="div">
      <_Builtin.Block className="mini_ad" tag="div">
        <_Builtin.Block
          className="vertical"
          id="w-node-_7a83a918-f3db-3a08-b161-84f16f46b7ae-6f46b7ac"
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
          id="w-node-_7a83a918-f3db-3a08-b161-84f16f46b7b3-6f46b7ac"
          loading="lazy"
          width="auto"
          height="auto"
          alt=""
          src="https://cdn.prod.website-files.com/68d88947f902d5546e5fd07a/68de1f9d6fd9064f8a768cd0_940e9ef3bfe638be7c3df1fdee595c29_Laptop%20coins.png"
        />
      </_Builtin.Block>
      <_Builtin.Block className="mini_ad _2" tag="div">
        <_Builtin.Block
          className="vertical"
          id="w-node-_7a83a918-f3db-3a08-b161-84f16f46b7b5-6f46b7ac"
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
          id="w-node-_7a83a918-f3db-3a08-b161-84f16f46b7ba-6f46b7ac"
          loading="lazy"
          width="auto"
          height="auto"
          alt=""
          src="https://cdn.prod.website-files.com/68d88947f902d5546e5fd07a/68e42d60646fb49aba0eaa3d_Mujer-con-laptop.png"
        />
      </_Builtin.Block>
    </_Component>
  );
}
