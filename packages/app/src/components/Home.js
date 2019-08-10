import React, { Fragment } from "react";
import { Box, Image } from "rebass";

import logo from "../images/logo.png";

function Home() {
  return (
    <Fragment>
      <Box p={4}>
        <Image width={200} src={logo} alt="Logo" />
      </Box>
    </Fragment>
  );
}

export default Home;
