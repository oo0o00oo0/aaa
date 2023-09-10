import React, { useState } from "react"
import styled from "styled-components"
import { Grid_1 } from "@src/layout/layout"

type Props = {}

const Contact = (props: Props) => {
   const [isImageLoaded, setImageLoaded] = useState(false)

   const ref = React.useRef<HTMLImageElement>(null)

   return (
      <Grid_1>
         <Header>Contact123</Header>
      </Grid_1>
   )
}

const Header = styled.h1`
   grid-area: header;
   font-family: WONKY;
`

const LoadingPlaceholder = styled.div`
   width: 100%; // Adjust according to your needs
   height: 300px; // Adjust according to your needs
   display: flex;
   align-items: center;
   justify-content: center;
   background-color: #e0e0e0; // Placeholder background
`

export default Contact
