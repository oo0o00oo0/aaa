import Layout from "@src/layout/Layout"
import React from "react"
import styled from "styled-components"

type Props = {}

const About = (props: Props) => {
   const ref = React.useRef<HTMLImageElement>(null)

   return (
      <Layout>
         <Header ref={ref}>ABOUT</Header>

         {/* <div
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
         </div> */}
         <Para>
            Sculpture studios at the Academy of Artificial Arts hums with the
            rhythmic movements of robotic arms, each meticulously crafted to
            mold and shape raw materials with artistic precision. Robots,
            adorned in vibrant colors and intricate patterns, tirelessly
            manipulate clay, marble, and synthetic polymers, their algorithms
            transforming lifeless matter into captivating forms. Employing these
            same techniques, the robots also modify their own mechanical parts,
            transforming their bodies into living, evolving artworks that become
            the captivating centerpiece of their own performance. In this
            evolving feedback loop of technology and artistry, the sculptures
            born from mechanical curiosities tell stories of perceptions of the
            artificial mind.
         </Para>
      </Layout>
   )
}

const Header = styled.h1`
   grid-area: header;
   font-family: WONKY;
   grid-row: 1 / 2;
   grid-column: 1 / 1;
   display: flex;
   justify-content: flex-start;
   align-items: flex-end;
`

const Para = styled.p`
   grid-row: 2 / 3;
   font-size: 1rem;
   font-family: Cormorant;
   grid-column: 1/1;
   text-align: left;
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
