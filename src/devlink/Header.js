"use client";
import React from "react";
import * as _Builtin from "./_Builtin";

export function Header({
  as: _Component = _Builtin.Block,
  userProfileLink = {},
  userLogOut = {},
  userProfilePicture = {},
}) {
  return (
    <_Component className="header" tag="div">
      <_Builtin.DropdownWrapper
        className="  dropdown"
        tag="div"
        delay="0"
        hover={true}
      >
        <_Builtin.DropdownToggle className="profile-dropdown" tag="div">
          <_Builtin.Image
            className="profile_image"
            width="60"
            height="auto"
            loading="auto"
            alt=""
            src="https://cdn.prod.website-files.com/68d88947f902d5546e5fd07a/68e463527ccbc9a0b6fad2b6_imgi_1_store-chat-specialist-icon-202506.jpg"
            {...userProfilePicture}
          />
        </_Builtin.DropdownToggle>
        <_Builtin.DropdownList className="dropdown-list" tag="nav">
          <_Builtin.Block className="dropdown_bg" tag="div">
            <_Builtin.DropdownLink
              className="dropdown_user_link"
              options={{
                href: "#",
              }}
              {...userProfileLink}
            >
              {"Ver perfil"}
            </_Builtin.DropdownLink>
            <_Builtin.DropdownLink
              className="dropdown_user_link"
              options={{
                href: "#",
              }}
              {...userLogOut}
            >
              {"Cerrar sesión"}
            </_Builtin.DropdownLink>
          </_Builtin.Block>
        </_Builtin.DropdownList>
      </_Builtin.DropdownWrapper>
    </_Component>
  );
}
