import useStore from "@src/state/store"
import React from "react"
import styled from "styled-components"

type Props = {}

const About = (props: Props) => {
   const ref = React.useRef<HTMLImageElement>(null)

   const ref_1 = React.useRef<HTMLImageElement>(null)
   const ref_2 = React.useRef<HTMLImageElement>(null)

   React.useEffect(() => {
      const subscription = useStore.subscribe(
         state => state.SCROLL_VALUE,
         scrollValue => {
            if (scrollValue < 0.22) {
               ref_1.current.style.opacity = "1"
               ref_2.current.style.opacity = "0"
               ref_2.current.style.transitionDelay = "0s"
               ref_1.current.style.transitionDelay = "0.3s"
            } else {
               ref_1.current.style.opacity = "0"
               ref_2.current.style.opacity = "1"
               ref_1.current.style.transitionDelay = "0s"
               ref_2.current.style.transitionDelay = "0.3s"
            }
         }
      )

      return () => subscription()
   }, [])

   return (
      <>
         <Header ref={ref}>ABOUT</Header>

         <Para ref={ref_1}>
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
         <Para
            style={{ opacity: 0 }}
            ref={ref_2}>
            SOME OTHER TEXT
         </Para>
      </>
   )
}

const Header = styled.h1`
   grid-area: header;
   font-family: WONKY;
   grid-row: 1 / 2;
   grid-column: 1 / 3;
   display: flex;
   justify-content: flex-start;
   align-items: flex-end;
`

const Para = styled.p`
   grid-row: 2 / 3;
   grid-column: 1 / 3;
   font-size: 2rem;
   font-family: Cormorant;
   text-align: left;
   transition: opacity 0.3s ease-in-out;
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
