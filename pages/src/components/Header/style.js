import styled from 'styled-components'

import { Flex, Button } from "rebass"

export const HeaderWrapper = styled.header `
    position: absolute;
    z-index: 100;
    width: 100%;
`

export const Nav = styled(Flex) `
    text-align: right;
    color: #5c5edc;

    a {
        text-decoration: none;
    }
`

export const PlayButton = styled(Button) `
    text-shadow: 0 1px 3px rgba(36,180,126,.4);
    border-radius: 40px;
    font-weight: 500;
    padding-right: 30px;
    padding-left: 30px;
    height: 40px;
    min-width: 120px;
    cursor: pointer;
`