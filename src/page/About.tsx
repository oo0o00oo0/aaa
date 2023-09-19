import useStore from "@src/state/store"
import { useStaggeredOpacity } from "@src/utils/functions"
import React from "react"
import styled from "styled-components"

type Props = {}

const About = (props: Props) => {
   const [navRef, handleNavStagger] = useStaggeredOpacity(
      true,
      [0.2, 0.4],
      false
   )

   React.useEffect(() => {
      const subscription = useStore.subscribe(
         state => state.SCROLL_VALUE,
         scrollValue => {
            handleNavStagger(scrollValue)
         }
      )

      return () => subscription()
   }, [handleNavStagger])
   return (
      <Wr ref={navRef}>
         <Header>ABOUT</Header>

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
      </Wr>
   )
}

const Wr = styled.div`
   grid-column: 1 / 4;
   grid-row: 3 / 4;

   * > {
      opacity: 0;
   }
`
const Header = styled.h1`
   grid-area: header;
   font-family: WONKY;

   display: flex;
   justify-content: flex-start;
   align-items: flex-end;
`

const Para = styled.p`
   /* grid-row: 2 / 3; */

   font-size: 2rem;
   font-family: Cormorant;
   text-align: left;
`

export default About
