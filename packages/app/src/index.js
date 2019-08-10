import React from "react";
import { render } from "react-dom";
import { Router } from "@reach/router";
import { ThemeProvider } from "theme-ui";
import preset from "@rebass/preset";

import Layout from "./components/Layout";
import Home from "./components/Home";
import NotFound from "./components/NotFound";

render(
  <ThemeProvider theme={preset}>
    <Layout>
      <Router>
        <Home path="/" />
        <NotFound default />
      </Router>
    </Layout>
  </ThemeProvider>,
  document.getElementById("root")
);
