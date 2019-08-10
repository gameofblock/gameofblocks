import React from "react";
import styled from "@emotion/styled";
import { Box, Image } from "rebass";

import logo from "../images/logo.png";

const StyledBox = styled(Box)`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  background: rgba(6, 18, 46, 0.5);
`;

const Header = props => {
  return (
    <StyledBox p={4}>
      <Image width={200} src={logo} alt="Logo" />
    </StyledBox>
  );
};

export default Header;
