import React from "react"
import { Image, Flex, Box, Button } from "rebass"
import { Link } from "gatsby"
import styled from "styled-components"

import translations from "../../translations/en.json"
import { HeaderWrapper, Nav, PlayButton } from "./style"
import Logo from "../../images/logo_full.png"

import "./style.css"

const Header = ({ language }) => (
  <HeaderWrapper>
    <Flex p={50} alignItems="center" justifyContent="end">
      <Box width={1 / 2} color="magenta">
        <Image width={[1, 1 / 2]} src={Logo} />
      </Box>
      <Nav alignItems="center" justifyContent="flex-end" as="nav" width={1 / 2}>
        {language !== "en" && (
          <Box mr={20}>
            <Link mr={20} to="/?lang=en">
              EN
            </Link>
          </Box>
        )}

        <Link to="/map">
          <PlayButton variant="primary">{translations.menu.menu_play}</PlayButton>
        </Link>
      </Nav>
    </Flex>
  </HeaderWrapper>
)

export default Header
