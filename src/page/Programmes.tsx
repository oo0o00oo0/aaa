import Layout from "@src/layout/Layout"
import React, { useState } from "react"
import styled from "styled-components"

type Props = {}

const Programmes = (props: Props) => {
   return (
      <Layout>
         <Header>PROGRAMMES</Header>
      </Layout>
   )
}

const Header = styled.h1`
   grid-area: header;
   font-family: WONKY;
   grid-row: 1/2;
`

export default Programmes
