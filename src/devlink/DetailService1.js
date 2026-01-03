"use client";
import React from "react";
import * as _Builtin from "./_Builtin";

export function DetailService1({
  as: _Component = _Builtin.Block,
  detailsDeviceBrandAndModel = "Device brand and model",
  detailsSerial = "Serial number:",
  detailsDeviceType = "Device type",
  detailsDepartmentOrContact = (
    <>
      {"Department or contact"}
      <br />
    </>
  ),
  detailsPowerAdapter = "-",
  detailsDataBackup = "-",
  detailsRequestOrIssue = "-",
  detailsAccesories = "-",
  detailsObservations = "-",
}) {
  return (
    <_Component
      className="status_card"
      id="w-node-_7b2d2dd4-466b-5ed2-6ba2-c8ade6a40120-e6a40120"
      tag="div"
    >
      <_Builtin.Block
        className="card_header"
        id="w-node-_7b2d2dd4-466b-5ed2-6ba2-c8ade6a40121-e6a40120"
        tag="div"
      >
        <_Builtin.Heading tag="h4">{"Detalles del servicio"}</_Builtin.Heading>
      </_Builtin.Block>
      <_Builtin.Block className="spacer_1_rem" tag="div" />
      <_Builtin.Block
        className="wrapper_flex_v_space_between"
        id="w-node-_7b2d2dd4-466b-5ed2-6ba2-c8ade6a40125-e6a40120"
        tag="div"
      >
        <_Builtin.Block className="corner_box image" tag="div">
          <_Builtin.Block className="wrapper_flex_h_space_between" tag="div">
            <_Builtin.Block tag="div">
              <_Builtin.Block className="small_text" tag="div">
                {detailsDeviceBrandAndModel}
              </_Builtin.Block>
              <_Builtin.Block className="spacer_1_rem" tag="div" />
              <_Builtin.Block className="small_text" tag="div">
                {detailsSerial}
              </_Builtin.Block>
              <_Builtin.Block className="spacer_1_rem" tag="div" />
              <_Builtin.Block className="small_text" tag="div">
                {detailsDeviceType}
              </_Builtin.Block>
              <_Builtin.Block className="spacer_1_rem" tag="div" />
              <_Builtin.Block className="small_text" tag="div">
                {detailsDepartmentOrContact}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Image
              className="service_device_type"
              loading="lazy"
              width="auto"
              height="auto"
              alt=""
              src="https://cdn.prod.website-files.com/68d88947f902d5546e5fd07a/68d8ab4d19a030bafad06999_Dragonfly_4.png"
            />
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block className="wrapper_flex_h_space_between" tag="div">
          <_Builtin.Block className="corner_box blue" tag="div">
            <_Builtin.Block className="detail_vertical" tag="div">
              <_Builtin.Block className="no_space_bottom" tag="div">
                {"Cargador:"}
              </_Builtin.Block>
              <_Builtin.Block tag="div">{detailsPowerAdapter}</_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block className="spacer_h_1rem" tag="div" />
          <_Builtin.Block className="corner_box purple" tag="div">
            <_Builtin.Block className="detail_vertical" tag="div">
              <_Builtin.Block className="no_space_bottom" tag="div">
                {"Respaldo:"}
              </_Builtin.Block>
              <_Builtin.Block tag="div">{detailsDataBackup}</_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block className="corner_box" tag="div">
          <_Builtin.Block className="detail_vertical" tag="div">
            <_Builtin.Block className="no_space_bottom" tag="div">
              {"Solicitud o falla"}
            </_Builtin.Block>
            <_Builtin.Block tag="div">{detailsRequestOrIssue}</_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block className="detail_vertical" tag="div">
            <_Builtin.Block className="no_space_bottom" tag="div">
              {"Accesorios"}
            </_Builtin.Block>
            <_Builtin.Block tag="div">{detailsAccesories}</_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block className="detail_vertical" tag="div">
            <_Builtin.Block className="no_space_bottom" tag="div">
              {"Observaciones"}
            </_Builtin.Block>
            <_Builtin.Block tag="div">{detailsObservations}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
