import * as React from "react";
import * as Types from "./types";

declare function PageHero(props: {
  as?: React.ElementType;
  imageHero1?: Types.Asset.Image;
  imageHero2?: Types.Asset.Image;
  heroTitle?: React.ReactNode;
}): React.JSX.Element;
