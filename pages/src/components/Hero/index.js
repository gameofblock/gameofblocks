import React, { useEffect, useState } from "react"
import { Flex, Card, Text, Box } from "rebass"
import { isMobile } from "react-device-detect"

import BackgroundImg from "../../images/hexagone-1-3.svg"

const Hero = props => {
  const [windowHeight, setWindowHeight] = useState(1024)
  useEffect(() => {
    if (!isMobile) {
      setWindowHeight(window.innerHeight)
    }
  })

  return (
    <Flex flexDirection={["column", "column", "row"]}>
      <Card
        width={1 / 2}
        backgroundRepeat="no-repeat"
        backgroundPosition={`right -${windowHeight - 50}px`}
        backgroundSize={"1380px auto"}
        backgroundImage={`url(${BackgroundImg})`}
      />
      <Box pr={200} width={1 / 2} style={{ height: windowHeight }}>
        <Box pt={windowHeight / 2 - 200}>
          <Box>
            <Text as="h1" fontSize={[50]}>
              {props.translations.hero_title}
            </Text>
            <Box as="p" mt={[20]} mb={[20]}>
              <b className="hero__subtitle" />
              <Text
                as="span"
                fontSize={[20]}
                fontWeight={400}
                dangerouslySetInnerHTML={{
                  __html: props.translations.hero_subtitle,
                }}
              />
            </Box>

            <div>
              <a className="button button--green button--large" href="/map">
                {props.translations.hero_subtitle_button}
              </a>
            </div>
          </Box>
        </Box>
      </Box>
    </Flex>
  )
}

export default Hero
