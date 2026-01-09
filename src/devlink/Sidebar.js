"use client";
import React from "react";
import * as _Builtin from "./_Builtin";

export function Sidebar({
  as: _Component = _Builtin.Block,

  sidebarDashboard = {
    href: "#",
  },

  sidebarDevices = {
    href: "#",
  },

  sidebarServices = {
    href: "#",
  },

  sidebarWarranties = {
    href: "#",
  },

  sidebarQuotations = {
    href: "#",
  },

  sidebarInvoices = {
    href: "#",
  },

  sidebarApprovals = {
    href: "#",
  },

  sidebarUserName = "User name",

  sidebarUserLogout = {
    href: "#",
  },

  sidebarUserProfile = "Ver perfil",
  sidebarUserProfilePicture = "https://cdn.prod.website-files.com/695c194c86d5e76167047ce4/69601f6219cf0d3e9e2d6d63_imgi_1_store-chat-specialist-icon-202506.jpg",
  sidebarUserAccountType = "Account type",
}) {
  return (
    <_Component className="sidebar" tag="div">
      <_Builtin.Block className="sidebar_header" tag="div">
        <_Builtin.Block className="wrapper-h-left" tag="div">
          <_Builtin.Image
            className="ui_icon_40"
            loading="lazy"
            width="auto"
            height="auto"
            alt=""
            src="https://cdn.prod.website-files.com/695c194c86d5e76167047ce4/69601a368ef2cac6701a87e5_Sidebar%20Icon.png"
          />
          <_Builtin.Image
            className="logo"
            loading="lazy"
            width="auto"
            height="auto"
            alt=""
            src="https://cdn.prod.website-files.com/695c194c86d5e76167047ce4/695c25f31b5665a9e4c5e3a2_2e69c7d700e0c10e78d3c620ad7a60f7_Logo%20Blue%20Gradient%20.svg"
          />
        </_Builtin.Block>
        <_Builtin.DropdownWrapper
          className="  dropdown"
          tag="div"
          delay="0"
          hover={false}
        >
          <_Builtin.DropdownToggle className="profile-dropdown" tag="div">
            <_Builtin.Block className="wrapper-v-left" tag="div">
              <_Builtin.Block tag="div">{sidebarUserName}</_Builtin.Block>
              <_Builtin.Block className="text-micro blue" tag="div">
                {sidebarUserAccountType}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Image
              className="profile_image"
              width="60"
              height="auto"
              loading="auto"
              alt=""
              src={sidebarUserProfilePicture}
            />
          </_Builtin.DropdownToggle>
          <_Builtin.DropdownList className="dropdown-list" tag="nav">
            <_Builtin.Block className="dropdown_bg" tag="div">
              <_Builtin.DropdownLink
                className="dropdown_user_link"
                options={{
                  href: "#",
                }}
              >
                {sidebarUserProfile}
              </_Builtin.DropdownLink>
              <_Builtin.DropdownLink
                className="dropdown_user_link"
                options={sidebarUserLogout}
              >
                {"Cerrar sesión"}
              </_Builtin.DropdownLink>
            </_Builtin.Block>
          </_Builtin.DropdownList>
        </_Builtin.DropdownWrapper>
      </_Builtin.Block>
      <_Builtin.Block className="list h" tag="div">
        <_Builtin.Link
          className="sidebar_links"
          id="w-node-_5bb2a6e9-ce81-5636-0afa-d838b3ef8628-b3ef8624"
          button={false}
          block="inline"
          options={sidebarDashboard}
        >
          <_Builtin.Block className="ui_icon_25" tag="div" />
          <_Builtin.Block className="sidebar_text" tag="div">
            {"Dashboard"}
          </_Builtin.Block>
        </_Builtin.Link>
        <_Builtin.Link
          className="sidebar_links"
          id="w-node-c70f49ca-1934-a9ef-e69e-f14dd016e926-b3ef8624"
          button={false}
          block="inline"
          options={sidebarDevices}
        >
          <_Builtin.Block className="ui_icon_25" tag="div" />
          <_Builtin.Block className="sidebar_text" tag="div">
            {"Dispositivos"}
          </_Builtin.Block>
        </_Builtin.Link>
        <_Builtin.Link
          className="sidebar_links"
          id="w-node-_920222b3-69eb-82b1-6bcd-909f1a7d8e81-b3ef8624"
          button={false}
          block="inline"
          options={sidebarServices}
        >
          <_Builtin.Block className="ui_icon_25" tag="div" />
          <_Builtin.Block className="sidebar_text" tag="div">
            {"Servicios"}
          </_Builtin.Block>
        </_Builtin.Link>
        <_Builtin.Link
          className="sidebar_links"
          id="w-node-_25ee22c8-af09-a369-ec80-fa4f288a7a6d-b3ef8624"
          button={false}
          block="inline"
          options={sidebarWarranties}
        >
          <_Builtin.Block className="ui_icon_25" tag="div" />
          <_Builtin.Block className="sidebar_text" tag="div">
            {"Garantías"}
          </_Builtin.Block>
        </_Builtin.Link>
        <_Builtin.Link
          className="sidebar_links"
          id="w-node-d5d002ff-9c51-f1e6-17a1-ef92c4eaf47a-b3ef8624"
          button={false}
          block="inline"
          options={sidebarApprovals}
        >
          <_Builtin.Block className="ui_icon_25" tag="div" />
          <_Builtin.Block className="sidebar_text" tag="div">
            {"Aprobaciones"}
          </_Builtin.Block>
        </_Builtin.Link>
        <_Builtin.Link
          className="sidebar_links"
          id="w-node-_9978ed73-eef8-eb15-a6ae-1c7ba1d518d4-b3ef8624"
          button={false}
          block="inline"
          options={sidebarQuotations}
        >
          <_Builtin.Block className="ui_icon_25" tag="div" />
          <_Builtin.Block className="sidebar_text" tag="div">
            {"Cotizaciones"}
          </_Builtin.Block>
        </_Builtin.Link>
        <_Builtin.Link
          className="sidebar_links"
          id="w-node-_49da35f0-3b3d-ba52-0919-b33e57e99688-b3ef8624"
          button={false}
          block="inline"
          options={sidebarInvoices}
        >
          <_Builtin.Block className="ui_icon_25" tag="div" />
          <_Builtin.Block className="sidebar_text" tag="div">
            {"Facturas"}
          </_Builtin.Block>
        </_Builtin.Link>
      </_Builtin.Block>
    </_Component>
  );
}
