import React from "react"
import { Image, Flex, Box, Button } from "rebass"
import { Link } from "gatsby"
import styled from 'styled-components'

import translations from "../../translations/en.json"
import { HeaderWrapper, Nav } from "./style"
import Logo from "../../images/logo_full.png"

import "./style.css"

const Header = ({ language }) => (
  <HeaderWrapper>
    <Flex p={50} alignItems='center' justifyContent='end'>
      <Box width={1 / 2} color="magenta">
        <Image width={[1, 1 / 2]} src={Logo} />
      </Box>
      {/* <Nav as="nav" width={1 / 2}>
        {language !== "en" && <Link to="/?lang=en">EN</Link>}

        <Link to="/map">
          <Button variant='primary'>
            {translations.menu.menu_play}
          </Button>
        </Link>

      </Nav> */}
    </Flex>
  </HeaderWrapper>
)

export default Header
