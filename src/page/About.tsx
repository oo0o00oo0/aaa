import useStore from "@src/state/store"
import { useStaggeredOpacity } from "@src/utils/functions"
import React from "react"
import styled from "styled-components"

type Props = {}

const About = (props: Props) => {
   const [navRef, handleNavStagger] = useStaggeredOpacity([
      0.1, 0.13, 0.17, 0.2
   ])

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
      <Wr>
         <Para ref={navRef}>
            <span>
               About Sculpture studios at the Academy of Artificial Arts hums
            </span>
            <br />
            <span>rhythmic movements of robotic arms, each meticulously</span>
            <br />
            <span>mold and shape raw materials with artistic precision.</span>
            <br />
            <span>
               adorned in vibrant colors and intricate patterns, tirelessly
            </span>
            <br />
            <span>
               manipulate clay, marble, and synthetic polymers, their algorithms
            </span>
         </Para>
      </Wr>
   )
}

const Wr = styled.div`
   grid-row: 2 / 3;
   grid-column: 1 / 4;
   font-size: 2rem;
   font-family: Cormorant;
   text-align: left;
   transition: opacity 0.1s ease-in-out;

   /* border: red solid 1px; */
`

const Para = styled.h3`
   font-weight: 200;
   font-size: 3rem;
`

export default About
