import React, { useState } from "react"
import styled from "styled-components"
import { Grid_1 } from "@src/layout/layout"

type Props = {}

const Programmes = (props: Props) => {
   return (
      <Grid_1>
         <Header>PROGRAMMES</Header>
      </Grid_1>
   )
}

const Header = styled.h1`
   grid-area: header;
   font-family: WONKY;
`

export default Programmes
