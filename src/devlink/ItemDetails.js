"use client";
import React from "react";
import * as _Builtin from "./_Builtin";

export function ItemDetails({
  as: _Component = _Builtin.Block,
  variant = "Base",
  detailsTitle = "Item Title",
  detailsStatus = "Status",
  detailsIdFormatted = "ID000",
  detailsDetail1 = "Detail 1",
  detailsDetail2 = "Detail 2",
  detailsDetail3 = "Detail 3",

  detailsActionButton = {
    href: "#",
  },

  detailsActionText = "Action text",
  detailsProgress = true,
  detailsProgressText1 = "Progress text 1:",
  detailsProgressText2 = "Progress text 2:",
  detailsProgressValue1 = "0000",
  detailsProgressValue2 = "0000",
  detailsProgressBar = {},
  detailsActionButtonVisibility = true,
  detailsDetail3Visibility = true,
}) {
  const _styleVariantMap = {
    Base: "",
    Positive: "w-variant-a271d605-5b16-65b4-a5b3-75fec2e3d425",
    Warning: "w-variant-07d93c96-6a12-72dd-924b-df7dc06400d0",
    Negative: "w-variant-8b889a31-6fcb-bfbd-c69e-c52aa5006e9a",
  };

  const _activeStyleVariant = _styleVariantMap[variant];

  return (
    <_Component className={`item-details ${_activeStyleVariant}`} tag="div">
      <_Builtin.Block className={`list ${_activeStyleVariant}`} tag="div">
        <_Builtin.Block
          className={`item-title ${_activeStyleVariant}`}
          id="w-node-_2bf01180-ce1c-9210-2abd-c6706c72bd41-6c72bd3f"
          tag="div"
        >
          <_Builtin.Block
            id="w-node-_2bf01180-ce1c-9210-2abd-c6706c72bd42-6c72bd3f"
            tag="div"
          >
            {detailsTitle}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={`item-text-detail blue ${_activeStyleVariant}`}
          id="w-node-_2bf01180-ce1c-9210-2abd-c6706c72bd44-6c72bd3f"
          tag="div"
        >
          {detailsIdFormatted}
        </_Builtin.Block>
        <_Builtin.Block
          className={`item-text-detail status ${_activeStyleVariant}`}
          tag="div"
        >
          {detailsStatus}
        </_Builtin.Block>
        <_Builtin.Block
          className={`item-text-detail ${_activeStyleVariant}`}
          id="w-node-_2bf01180-ce1c-9210-2abd-c6706c72bd48-6c72bd3f"
          tag="div"
        >
          {detailsDetail1}
        </_Builtin.Block>
        <_Builtin.Block
          className={`item-text-detail ${_activeStyleVariant}`}
          id="w-node-_2bf01180-ce1c-9210-2abd-c6706c72bd4a-6c72bd3f"
          tag="div"
        >
          {detailsDetail2}
        </_Builtin.Block>
        {detailsDetail3Visibility ? (
          <_Builtin.Block
            className={`item-text-detail ${_activeStyleVariant}`}
            id="w-node-_2bf01180-ce1c-9210-2abd-c6706c72bd4c-6c72bd3f"
            tag="div"
          >
            {detailsDetail3}
          </_Builtin.Block>
        ) : null}
        <_Builtin.Block
          className={`wrapper-button-right ${_activeStyleVariant}`}
          id="w-node-_2bf01180-ce1c-9210-2abd-c6706c72bd4e-6c72bd3f"
          tag="div"
        >
          {detailsActionButtonVisibility ? (
            <_Builtin.Link
              className={`button-action ${_activeStyleVariant}`}
              button={true}
              block=""
              options={detailsActionButton}
            >
              {detailsActionText}
            </_Builtin.Link>
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
      {detailsProgress ? (
        <_Builtin.Block
          className={`status-box ${_activeStyleVariant}`}
          tag="div"
        >
          <_Builtin.Block className={`list ${_activeStyleVariant}`} tag="div">
            <_Builtin.Block
              className={`wrapper-h-left ${_activeStyleVariant}`}
              id="w-node-_7de944b8-8872-50c6-78dd-22b118633fe6-6c72bd3f"
              tag="div"
            >
              <_Builtin.Block
                id="w-node-_2bf01180-ce1c-9210-2abd-c6706c72bd53-6c72bd3f"
                tag="div"
              >
                {detailsProgressText1}
              </_Builtin.Block>
              <_Builtin.Block
                className={`spacer_05_rem ${_activeStyleVariant}`}
                tag="div"
              />
              <_Builtin.Block
                id="w-node-_053356fa-ca89-d830-b974-165db20ee917-6c72bd3f"
                tag="div"
              >
                {detailsProgressValue1}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={`wrapper-h-left ${_activeStyleVariant}`}
              id="w-node-_1feb0d86-358d-4352-59c7-dceaafc14582-6c72bd3f"
              tag="div"
            >
              <_Builtin.Block
                id="w-node-_1feb0d86-358d-4352-59c7-dceaafc14583-6c72bd3f"
                tag="div"
              >
                {detailsProgressText2}
              </_Builtin.Block>
              <_Builtin.Block
                className={`spacer_05_rem ${_activeStyleVariant}`}
                tag="div"
              />
              <_Builtin.Block
                id="w-node-_1feb0d86-358d-4352-59c7-dceaafc14586-6c72bd3f"
                tag="div"
              >
                {detailsProgressValue2}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={`progress-wrapper full ${_activeStyleVariant}`}
              id="w-node-_2bf01180-ce1c-9210-2abd-c6706c72bd5c-6c72bd3f"
              tag="div"
            >
              <_Builtin.Block
                className={`progress-bar ${_activeStyleVariant}`}
                tag="div"
                {...detailsProgressBar}
              />
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
