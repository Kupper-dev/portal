"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { ProgressBar } from "./ProgressBar";
import { StatusBadge } from "./StatusBadge";

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
  return (
    <_Component className="dynamic_row" tag="div">
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
