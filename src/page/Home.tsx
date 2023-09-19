import useStore from "@src/state/store"
import { useStaggeredOpacity } from "@src/utils/functions"
import React from "react"
import styled from "styled-components"

type Props = {}

const Home = (props: Props) => {
   const [navRef, handleNavStagger] = useStaggeredOpacity([
      0.0, 0.0, 0.015, 0.03
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
               Sculpture studios at the Academy of Artificial Arts hums
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

export default Home

const Wr = styled.div`
   grid-row: 3 / 4;
   grid-column: 1 / 4;
   font-family: Cormorant;
   text-align: left;
   /* border: red solid 1px; */
`

const Para = styled.h3`
   font-weight: 500;
   font-size: 3.2rem;
   /* font */
`
