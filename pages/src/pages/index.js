import React, { Fragment } from "react"

import SEO from "../components/SEO"
import Hero from "../components/Hero"
import Layout from "../components/Layout"
import Introduction from "../components/Introduction"
import MapDemo from "../components/MapDemo"
import { mapDemo } from "../constants/mapDemo"
import translations from '../translations/en.json'

import '../stylesheets/home.css'

const IndexPage = () => {
  return (
    <Fragment>
      <SEO title="Decentralized strategy game powered by Nebulas smart contracts" />
      <Layout translations={translations.home}>
        <div className="home">
          <Hero translations={translations.home} />
          <Introduction translations={translations.home} />
          <MapDemo
            map={mapDemo}
            step={1}
            isFrozen={false}
            translations={translations.home}
          />
        </div>
      </Layout>
    </Fragment>
  )
}

export default IndexPage