"use client";
import React from "react";
import * as _Builtin from "./_Builtin";

export function TrackerCell({
  as: _Component = _Builtin.Block,
  variant = "Base",
  trackerDate = "DD/MM/YY",
  trackerHour = "00:00",
  trackerStatusTitle = "Status title",
  trackerStatusMessage = "Status message",
  trackerAlert = false,
  trackerAlertText = "Alert text",

  trackerLink1 = {
    href: "#",
  },

  trackerLink1Text = "Ver diagnostico",
  trackerLink1Visibility = true,
  trackerLink2Visibility = true,

  link2 = {
    href: "#",
  },

  trackerLink2Text = "action",
  trackerLinksWrapperVisibility = false,
}) {
  const _styleVariantMap = {
    Base: "",
    check: "w-variant-6cbce0e7-14c5-d2c3-8788-c75cd7442953",
  };

  const _activeStyleVariant = _styleVariantMap[variant];

  return (
    <_Component
      className={`tracker-row ${_activeStyleVariant}`}
      id="w-node-_9e95d6c4-cc0b-a77a-dde0-420a827df437-827df437"
      tag="div"
    >
      <_Builtin.Block
        className={`wrapper-h-space-between ${_activeStyleVariant}`}
        id="w-node-_9e95d6c4-cc0b-a77a-dde0-420a827df438-827df437"
        tag="div"
      >
        <_Builtin.Block
          className={`status-check-icon ${_activeStyleVariant}`}
          tag="div"
        />
        <_Builtin.Block
          className={`status_time_wrapper ${_activeStyleVariant}`}
          id="w-node-_9e95d6c4-cc0b-a77a-dde0-420a827df43a-827df437"
          tag="div"
        >
          <_Builtin.Block
            className={`small_text text_gray ${_activeStyleVariant}`}
            tag="div"
          >
            {trackerDate}
          </_Builtin.Block>
          <_Builtin.Block
            className={`small_text text_gray ${_activeStyleVariant}`}
            tag="div"
          >
            {trackerHour}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={`tracking-cell ${_activeStyleVariant}`}
        id="w-node-_9e95d6c4-cc0b-a77a-dde0-420a827df43f-827df437"
        tag="div"
      >
        <_Builtin.Block className={`list ${_activeStyleVariant}`} tag="div">
          <_Builtin.Block
            className={`text-medium ${_activeStyleVariant}`}
            id="w-node-_9e95d6c4-cc0b-a77a-dde0-420a827df441-827df437"
            tag="div"
          >
            {trackerStatusTitle}
          </_Builtin.Block>
          <_Builtin.Block
            className={`text-small ${_activeStyleVariant}`}
            id="w-node-_9e95d6c4-cc0b-a77a-dde0-420a827df443-827df437"
            tag="div"
          >
            {trackerStatusMessage}
          </_Builtin.Block>
          {trackerAlert ? (
            <_Builtin.Block
              className={`tracker-alert ${_activeStyleVariant}`}
              id="w-node-_9e95d6c4-cc0b-a77a-dde0-420a827df445-827df437"
              tag="div"
            >
              <_Builtin.Block tag="div">{trackerAlertText}</_Builtin.Block>
            </_Builtin.Block>
          ) : null}
          {trackerLinksWrapperVisibility ? (
            <_Builtin.Block
              className={`wrapper-h-space-between ${_activeStyleVariant}`}
              tag="div"
            >
              {trackerLink1Visibility ? (
                <_Builtin.Block
                  className={`text-link ${_activeStyleVariant}`}
                  tag="div"
                >
                  <_Builtin.Link button={false} block="" options={trackerLink1}>
                    {trackerLink1Text}
                  </_Builtin.Link>
                  {" ↗"}
                </_Builtin.Block>
              ) : null}
              {trackerLink2Visibility ? (
                <_Builtin.Link
                  className={`button-action ${_activeStyleVariant}`}
                  button={true}
                  block=""
                  options={link2}
                >
                  {trackerLink2Text}
                </_Builtin.Link>
              ) : null}
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
