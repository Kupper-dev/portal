"use client";
import React from "react";
import * as _Builtin from "./_Builtin";

export function PageHero({
  as: _Component = _Builtin.Block,
  imageHero1 = "https://cdn.prod.website-files.com/695c194c86d5e76167047ce4/695d48065aa88b8ec7598e18_1338755d39e40738244056bed0d9067f_DH1.png",
  imageHero2 = "https://cdn.prod.website-files.com/695c194c86d5e76167047ce4/695d480dc2b80a120e869530_e23eac12d1a0a451f35467abcd9d57bf_DH2.png",
  heroTitle = "Dispositivos",
}) {
  return (
    <_Component className="page-header" tag="div">
      <_Builtin.Image
        className="dh2"
        loading="lazy"
        width="auto"
        height="auto"
        alt=""
        src={imageHero2}
      />
      <_Builtin.Image
        className="dh1"
        loading="lazy"
        width="auto"
        height="auto"
        alt=""
        src={imageHero1}
      />
      <_Builtin.Block className="list" tag="div">
        <_Builtin.Heading
          id="w-node-_45b0cfed-502d-564e-90f3-df34e0b1a9f8-e0b1a9f4"
          tag="h1"
        >
          {heroTitle}
        </_Builtin.Heading>
      </_Builtin.Block>
    </_Component>
  );
}
