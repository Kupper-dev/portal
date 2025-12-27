"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";

const _interactionsData = JSON.parse(
  '{"events":{"e-3":{"id":"e-3","name":"","animationType":"custom","eventTypeId":"PAGE_START","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-3","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-4"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"wf-page-id","appliesTo":"PAGE","styleBlockIds":[]},"targets":[{"id":"wf-page-id","appliesTo":"PAGE","styleBlockIds":[]}],"config":{"loop":true,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1759352590844}},"actionLists":{"a-3":{"id":"a-3","title":"status_circle","actionItemGroups":[{"actionItems":[{"id":"a-3-n","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":500,"easing":"ease","duration":500,"target":{"id":"b33d686b-1fc0-5200-0a6f-d13c74e77246"},"globalSwatchId":"","rValue":255,"bValue":0,"gValue":157,"aValue":1}}]},{"actionItems":[{"id":"a-3-n-2","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":500,"easing":"ease","duration":500,"target":{"id":"b33d686b-1fc0-5200-0a6f-d13c74e77246"},"globalSwatchId":"--green","rValue":102,"bValue":98,"gValue":223,"aValue":1}}]}],"useFirstGroupAsInitialState":false,"createdOn":1759352595425},"a-4":{"id":"a-4","title":"status_circle 2","actionItemGroups":[{"actionItems":[{"id":"a-4-n","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":500,"easing":"ease","duration":500,"target":{"id":"694f1ef5cdb3d2a8297c8e31|b33d686b-1fc0-5200-0a6f-d13c74e77246"},"globalSwatchId":"","rValue":255,"bValue":0,"gValue":157,"aValue":1}}]},{"actionItems":[{"id":"a-4-n-2","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":500,"easing":"ease","duration":500,"target":{"id":"694f1ef5cdb3d2a8297c8e31|b33d686b-1fc0-5200-0a6f-d13c74e77246"},"globalSwatchId":"--green","rValue":102,"bValue":98,"gValue":223,"aValue":1}}]}],"useFirstGroupAsInitialState":false,"createdOn":1759352595425}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function ServicesDetailsAndStatus({ as: _Component = _Builtin.Grid }) {
  _interactions.useInteractions(_interactionsData);

  return (
    <_Component
      className="_1-2-grid"
      id="w-node-b33d686b-1fc0-5200-0a6f-d13c74e77201-74e77201"
      tag="div"
    >
      <_Builtin.Block
        className="module s-details"
        id="w-node-b33d686b-1fc0-5200-0a6f-d13c74e77202-74e77201"
        tag="div"
      >
        <_Builtin.Block className="card_header" tag="div">
          <_Builtin.Heading tag="h4">
            {"Detalles del servicio"}
          </_Builtin.Heading>
        </_Builtin.Block>
        <_Builtin.Block className="service_details" tag="div">
          <_Builtin.Block className="_1-5rem_container" tag="div">
            <_Builtin.Block className="title_2" tag="div">
              {"Macbook Air 2020"}
            </_Builtin.Block>
            <_Builtin.Block className="text_inflex_wrapper" tag="div">
              <_Builtin.Block className="small_text text_gray" tag="div">
                {"Serial: "}
              </_Builtin.Block>
              <_Builtin.Block className="small_text text_gray" tag="div">
                {"C024KWM003LA"}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className="wrapper_flex_h_left"
              id="w-node-b33d686b-1fc0-5200-0a6f-d13c74e7720f-74e77201"
              tag="div"
            />
            <_Builtin.Block className="wrapper_flex_v_space_between" tag="div">
              <_Builtin.Block className="text_inflex_wrapper" tag="div">
                <_Builtin.Block className="no-space-bottom" tag="div">
                  {"Solicitud o falla:"}
                </_Builtin.Block>
                <_Builtin.Block tag="div">{"Daño en pantalla"}</_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block className="text_inflex_wrapper" tag="div">
                <_Builtin.Block className="no-space-bottom" tag="div">
                  {"Observaciones:"}
                </_Builtin.Block>
                <_Builtin.Block tag="div">{"Respaldo"}</_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block className="text_inflex_wrapper" tag="div">
                <_Builtin.Block className="no-space-bottom" tag="div">
                  {"Cargador:"}
                </_Builtin.Block>
                <_Builtin.Block tag="div">{"Sin cargador"}</_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block className="text_inflex_wrapper" tag="div">
                <_Builtin.Block className="no-space-bottom" tag="div">
                  {"Respaldo:"}
                </_Builtin.Block>
                <_Builtin.Block tag="div">{"Sin cargador"}</_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block className="text_inflex_wrapper" tag="div">
                <_Builtin.Block className="no-space-bottom" tag="div">
                  {"Fecha:"}
                </_Builtin.Block>
                <_Builtin.Block tag="div">{"27/12/25"}</_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className="status_card" tag="div">
        <_Builtin.Block
          className="card_header"
          id="w-node-b33d686b-1fc0-5200-0a6f-d13c74e7722b-74e77201"
          tag="div"
        >
          <_Builtin.Heading tag="h4">{"Status"}</_Builtin.Heading>
        </_Builtin.Block>
        <_Builtin.Block
          className="status_row"
          id="w-node-b33d686b-1fc0-5200-0a6f-d13c74e7722e-74e77201"
          tag="div"
        >
          <_Builtin.Block
            className="wrapper_flex_h_space_between"
            id="w-node-b33d686b-1fc0-5200-0a6f-d13c74e7722f-74e77201"
            tag="div"
          >
            <_Builtin.Block
              className="status_check_icon active last"
              tag="div"
            />
            <_Builtin.Block className="status_time_wrapper active" tag="div">
              <_Builtin.Block className="small_text text_gray" tag="div">
                {"20/05/25"}
              </_Builtin.Block>
              <_Builtin.Block className="small_text text_gray" tag="div">
                {"13:58"}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className="status_cell check"
            id="w-node-b33d686b-1fc0-5200-0a6f-d13c74e77236-74e77201"
            tag="div"
          >
            <_Builtin.Heading className="no-space-bottom" tag="h6">
              {"Dispositivo recibido"}
            </_Builtin.Heading>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className="status_row"
          id="w-node-b33d686b-1fc0-5200-0a6f-d13c74e77239-74e77201"
          tag="div"
        >
          <_Builtin.Block
            className="wrapper_flex_h_space_between"
            id="w-node-b33d686b-1fc0-5200-0a6f-d13c74e7723a-74e77201"
            tag="div"
          >
            <_Builtin.Block className="status_check_icon active" tag="div" />
            <_Builtin.Block className="status_time_wrapper active" tag="div">
              <_Builtin.Block className="small_text text_gray" tag="div">
                {"20/05/25"}
              </_Builtin.Block>
              <_Builtin.Block className="small_text text_gray" tag="div">
                {"13:58"}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className="status_cell check"
            id="w-node-b33d686b-1fc0-5200-0a6f-d13c74e77241-74e77201"
            tag="div"
          >
            <_Builtin.Heading
              className="no-space-bottom"
              id="w-node-b33d686b-1fc0-5200-0a6f-d13c74e77242-74e77201"
              tag="h6"
            >
              {"En revisión"}
            </_Builtin.Heading>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className="status_row"
          id="w-node-b33d686b-1fc0-5200-0a6f-d13c74e77244-74e77201"
          tag="div"
        >
          <_Builtin.Block
            className="wrapper_flex_h_space_between"
            id="w-node-b33d686b-1fc0-5200-0a6f-d13c74e77245-74e77201"
            tag="div"
          >
            <_Builtin.Block
              className="status_check_icon active"
              data-w-id="b33d686b-1fc0-5200-0a6f-d13c74e77246"
              tag="div"
            />
            <_Builtin.Block className="status_time_wrapper active" tag="div">
              <_Builtin.Block className="small_text text_gray" tag="div">
                {"20/05/25"}
              </_Builtin.Block>
              <_Builtin.Block className="small_text text_gray" tag="div">
                {"13:58"}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className="status_cell active"
            id="w-node-b33d686b-1fc0-5200-0a6f-d13c74e7724c-74e77201"
            tag="div"
          >
            <_Builtin.Heading className="no-space-bottom" tag="h6">
              {"Revisa tu diagnostico"}
            </_Builtin.Heading>
            <_Builtin.Block
              id="w-node-b33d686b-1fc0-5200-0a6f-d13c74e7724f-74e77201"
              tag="div"
            >
              {"$1900.00 MXN"}
            </_Builtin.Block>
            <_Builtin.Block
              className="wrapper_flex_h_space_between"
              id="w-node-b33d686b-1fc0-5200-0a6f-d13c74e77251-74e77201"
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
                {"Ver diagnostico "}
                <_Builtin.Span className="north_east_arrow">
                  {"↗"}
                </_Builtin.Span>
              </_Builtin.Link>
              <_Builtin.Link
                className="dashboard_button"
                button={true}
                block=""
                options={{
                  href: "#",
                }}
              >
                {"Aceptar servicio"}
              </_Builtin.Link>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className="status_row"
          id="w-node-b33d686b-1fc0-5200-0a6f-d13c74e77258-74e77201"
          tag="div"
        >
          <_Builtin.Block
            className="wrapper_flex_h_space_between"
            id="w-node-b33d686b-1fc0-5200-0a6f-d13c74e77259-74e77201"
            tag="div"
          >
            <_Builtin.Block className="status_check_icon" tag="div" />
            <_Builtin.Block className="status_time_wrapper" tag="div">
              <_Builtin.Block className="small_text text_gray" tag="div">
                {"20/05/25"}
              </_Builtin.Block>
              <_Builtin.Block className="small_text text_gray" tag="div">
                {"13:58"}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className="status_cell"
            id="w-node-b33d686b-1fc0-5200-0a6f-d13c74e77260-74e77201"
            tag="div"
          >
            <_Builtin.Heading className="no-space-bottom" tag="h6">
              {"Refacciones en camino"}
            </_Builtin.Heading>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className="status_row"
          id="w-node-b33d686b-1fc0-5200-0a6f-d13c74e77263-74e77201"
          tag="div"
        >
          <_Builtin.Block
            className="wrapper_flex_h_space_between"
            id="w-node-b33d686b-1fc0-5200-0a6f-d13c74e77264-74e77201"
            tag="div"
          >
            <_Builtin.Block className="status_check_icon" tag="div" />
            <_Builtin.Block className="status_time_wrapper" tag="div">
              <_Builtin.Block className="small_text text_gray" tag="div">
                {"20/05/25"}
              </_Builtin.Block>
              <_Builtin.Block className="small_text text_gray" tag="div">
                {"13:58"}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className="status_cell"
            id="w-node-b33d686b-1fc0-5200-0a6f-d13c74e7726b-74e77201"
            tag="div"
          >
            <_Builtin.Heading className="no-space-bottom" tag="h6">
              {"Inicia reparación "}
            </_Builtin.Heading>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className="status_row"
          id="w-node-b33d686b-1fc0-5200-0a6f-d13c74e7726e-74e77201"
          tag="div"
        >
          <_Builtin.Block
            className="wrapper_flex_h_space_between"
            id="w-node-b33d686b-1fc0-5200-0a6f-d13c74e7726f-74e77201"
            tag="div"
          >
            <_Builtin.Block className="status_check_icon" tag="div" />
            <_Builtin.Block className="status_time_wrapper" tag="div">
              <_Builtin.Block className="small_text text_gray" tag="div">
                {"20/05/25"}
              </_Builtin.Block>
              <_Builtin.Block className="small_text text_gray" tag="div">
                {"13:58"}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className="status_cell"
            id="w-node-b33d686b-1fc0-5200-0a6f-d13c74e77276-74e77201"
            tag="div"
          >
            <_Builtin.Heading className="no-space-bottom" tag="h6">
              {"Lista para recoger"}
            </_Builtin.Heading>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className="status_row"
          id="w-node-b33d686b-1fc0-5200-0a6f-d13c74e77279-74e77201"
          tag="div"
        >
          <_Builtin.Block
            className="wrapper_flex_h_space_between"
            id="w-node-b33d686b-1fc0-5200-0a6f-d13c74e7727a-74e77201"
            tag="div"
          >
            <_Builtin.Block className="status_check_icon" tag="div" />
            <_Builtin.Block className="status_time_wrapper" tag="div">
              <_Builtin.Block className="small_text text_gray" tag="div">
                {"20/05/25"}
              </_Builtin.Block>
              <_Builtin.Block className="small_text text_gray" tag="div">
                {"13:58"}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className="status_cell"
            id="w-node-b33d686b-1fc0-5200-0a6f-d13c74e77281-74e77201"
            tag="div"
          >
            <_Builtin.Heading className="no-space-bottom" tag="h6">
              {"Dispositivo entregado"}
            </_Builtin.Heading>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
