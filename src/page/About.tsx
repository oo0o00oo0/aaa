import React from "react"
import styled from "styled-components"
import { Grid_1 } from "@src/layout/layout"

type Props = {}

const About = (props: Props) => {
   return (
      <Grid_1>
         <Header>ABOUT123</Header>
         <img src="/atlas/atlas.webp"></img>
      </Grid_1>
   )
}

const Header = styled.h1`
   grid-area: header;
   font-family: WONKY;
`

export default About
