"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { ProgressBar } from "./ProgressBar";
import { StatusBadge } from "./StatusBadge";

const _interactionsData = JSON.parse(
  '{"events":{"e-11":{"id":"e-11","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-9","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-12"}},"mediaQueries":["main","medium","small","tiny"],"target":{"appliesTo":"ELEMENT","styleBlockIds":[],"id":"30873253-9fc0-0083-b6f8-6601c88e8d73"},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1767632561057},"e-12":{"id":"e-12","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-10","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-11"}},"mediaQueries":["main","medium","small","tiny"],"target":{"appliesTo":"ELEMENT","styleBlockIds":[],"id":"30873253-9fc0-0083-b6f8-6601c88e8d73"},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1767632561058}},"actionLists":{"a-9":{"id":"a-9","title":"Row Open","actionItemGroups":[{"actionItems":[{"id":"a-9-n-3","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"7e9f016b-d977-bbc8-6141-c31db4de6a14"},"heightValue":4.26,"widthUnit":"PX","heightUnit":"rem","locked":false}}]},{"actionItems":[{"id":"a-9-n-2","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"outQuint","duration":800,"target":{"useEventTarget":true,"id":"7e9f016b-d977-bbc8-6141-c31db4de6a14"},"heightValue":100,"widthUnit":"PX","heightUnit":"%","locked":false}}]}],"useFirstGroupAsInitialState":true,"createdOn":1767459692598},"a-10":{"id":"a-10","title":"Row closes","actionItemGroups":[{"actionItems":[{"id":"a-10-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"outQuint","duration":800,"target":{"useEventTarget":true,"id":"7e9f016b-d977-bbc8-6141-c31db4de6a14"},"heightValue":4.25,"widthUnit":"PX","heightUnit":"rem","locked":false}}]}],"useFirstGroupAsInitialState":false,"createdOn":1767459878497}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function DevicesTable({
  as: _Component = _Builtin.Block,
  devicesDeviceAssignedTo = "Asignado a",
  devicesDeviceFormattedId = "D0000",
  devicesDeviceType = "https://cdn.prod.website-files.com/68d88947f902d5546e5fd07a/695a072d772f5c44ccf0f824_LAptop%201.png",
  devicesDeviceRemainingDaysToNextMaintenance = "En X días",
  devicesDeviceBrandAndModel = "Dispositivo",
  statusBadgeDeviceStatusBadgeVariant = null,
  statusBadgeDeviceStatusText = "status",
  devicesDeviceRam = "RAM",
  devicesDeviceSerialNumber = "SN:",
  devicesDeviceCpu = "Procesador",
  devicesDeviceStorage = "Almacenamiento",
  devicesDeviceStorageType = "Tipode almacenamiento",

  devicesDeviceLastService = {
    href: "#",
  },

  devicesDeviceProgressBar = {},
  progressBarVariantProgressBar = null,
  progressBarProgressbarPercentage = {},

  progressBarRequestMaintenance = {
    href: "#",
  },
}) {
  _interactions.useInteractions(_interactionsData);

  return (
    <_Component
      className="dynamic_row"
      data-w-id="30873253-9fc0-0083-b6f8-6601c88e8d73"
      tag="div"
    >
      <_Builtin.Block className="table_row_2" tag="div">
        <_Builtin.Block
          className="table_cell"
          id="w-node-_30873253-9fc0-0083-b6f8-6601c88e8d75-c88e8d73"
          tag="div"
        >
          <_Builtin.Image
            className="ui_image_40"
            loading="lazy"
            width="auto"
            height="auto"
            alt=""
            src={devicesDeviceType}
          />
        </_Builtin.Block>
        <_Builtin.Block
          className="table_cell"
          id="w-node-_30873253-9fc0-0083-b6f8-6601c88e8d77-c88e8d73"
          tag="div"
        >
          <_Builtin.Block tag="div">
            <_Builtin.Block className="no_space_bottom" tag="div">
              {devicesDeviceBrandAndModel}
            </_Builtin.Block>
            <_Builtin.Block className="spacer_-25_rem" tag="div" />
            <_Builtin.Block className="small_text text_gray" tag="div">
              {devicesDeviceAssignedTo}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block className="no_space_bottom blue" tag="div">
            {devicesDeviceFormattedId}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className="table_cell h"
          id="w-node-_30873253-9fc0-0083-b6f8-6601c88e8d80-c88e8d73"
          tag="div"
        >
          <ProgressBar
            variant={progressBarVariantProgressBar}
            progressbar={progressBarProgressbarPercentage}
            requestMaintenance={progressBarRequestMaintenance}
          />
          <_Builtin.Block tag="div">
            {devicesDeviceRemainingDaysToNextMaintenance}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className="table_cell h"
          id="w-node-_30873253-9fc0-0083-b6f8-6601c88e8d85-c88e8d73"
          tag="div"
        >
          <StatusBadge
            variant={statusBadgeDeviceStatusBadgeVariant}
            statusTitle={statusBadgeDeviceStatusText}
          />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className="row_expanded_details _1" tag="div">
        <_Builtin.Block
          className="wrapper_flex_v_space_between"
          id="w-node-_30873253-9fc0-0083-b6f8-6601c88e8d88-c88e8d73"
          tag="div"
        >
          <_Builtin.Block className="corner_box image" tag="div">
            <_Builtin.Block className="wrapper_flex_h_space_between" tag="div">
              <_Builtin.Block className="list_grid" tag="div">
                <_Builtin.Block className="no_space_bottom" tag="div">
                  {devicesDeviceBrandAndModel}
                </_Builtin.Block>
                <_Builtin.Block className="small_text" tag="div">
                  {devicesDeviceSerialNumber}
                </_Builtin.Block>
                <_Builtin.Block className="small_text" tag="div">
                  {devicesDeviceAssignedTo}
                </_Builtin.Block>
                <_Builtin.Block className="small_text" tag="div">
                  {devicesDeviceRam}
                </_Builtin.Block>
                <_Builtin.Block className="small_text" tag="div">
                  {devicesDeviceCpu}
                </_Builtin.Block>
                <_Builtin.Block className="small_text" tag="div">
                  {devicesDeviceStorage}
                </_Builtin.Block>
                <_Builtin.Block
                  className="small_text"
                  id="w-node-_69d01cc2-eb38-e017-ae8d-3d46444540da-c88e8d73"
                  tag="div"
                >
                  {devicesDeviceStorageType}
                </_Builtin.Block>
                <_Builtin.Link
                  className="small_text text_blue"
                  id="w-node-_09be95c9-b25f-5649-8321-ea1ddafa0957-c88e8d73"
                  button={false}
                  block=""
                  options={devicesDeviceLastService}
                >
                  {"Ultimo servicio"}
                </_Builtin.Link>
              </_Builtin.Block>
              <_Builtin.Image
                className="service_device_type"
                width="auto"
                height="auto"
                loading="lazy"
                alt=""
                src="https://cdn.prod.website-files.com/68d88947f902d5546e5fd07a/695a072d772f5c44ccf0f824_LAptop%201.png"
              />
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block className="wrapper_flex_h_space_between" tag="div" />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
