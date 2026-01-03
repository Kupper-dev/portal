import * as React from "react";
import * as Types from "./types";

declare function TablePagination(props: {
  as?: React.ElementType;
  anterior?: Types.Basic.Link;
  siguiente?: Types.Basic.Link;
  paginationCountFirst?: Types.Basic.Link;
  paginationPaginationCountSecondVisibility?: Types.Visibility.VisibilityConditions;
  paginationPaginationCountThird?: Types.Basic.Link;
  paginationPaginationCountThirdVisibility?: Types.Visibility.VisibilityConditions;
  paginationPaginationCountLast?: Types.Basic.Link;
  paginationPaginationCountLastVisibility?: Types.Visibility.VisibilityConditions;
  paginationPaginationCountSecond?: Types.Basic.Link;
}): React.JSX.Element;
