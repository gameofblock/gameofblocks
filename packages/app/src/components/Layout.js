import React, { Fragment } from "react";
import { Global } from "@emotion/core";

import GlobalStyle from "../style/GlobalStyle";

function Layout(props) {
  return (
    <Fragment>
      <Global style={GlobalStyle} />
      {props.children}
    </Fragment>
  );
}

export default Layout;
