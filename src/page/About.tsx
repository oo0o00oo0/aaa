import React, { useState } from "react"
import styled from "styled-components"
import { Grid_1 } from "@src/layout/layout"

type Props = {}

const About = (props: Props) => {
   const [isImageLoaded, setImageLoaded] = useState(false)

   const ref = React.useRef<HTMLImageElement>(null)

   return (
      <Grid_1>
         <Header>ABOUT123</Header>

         <div
            style={{
               top: "40px",
               position: "absolute"
            }}>
            <div
               style={{
                  top: "400px",
                  position: "absolute",
                  height: "400px",
                  width: "400px"
               }}>
               <img
                  style={{
                     zIndex: 2,
                     opacity: isImageLoaded ? 1 : 0,
                     transition: "opacity 1s ease-in-out",
                     position: "absolute"
                  }}
                  ref={ref}
                  src="/atlas/atlas.webp"
                  onLoad={e => setImageLoaded(true)}
                  alt="Atlas"
               />
            </div>
            <LoadingPlaceholder
               style={{
                  zIndex: 1,
                  top: "400px",
                  position: "absolute",
                  height: "400px",
                  width: "400px"
               }}>
               Loading image...
            </LoadingPlaceholder>
         </div>
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

export default About
