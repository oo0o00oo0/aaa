import useStore from "@src/state/store"
import { useStaggeredOpacity } from "@src/utils/functions"
import React from "react"
import styled from "styled-components"

type Props = {}

const Home = (props: Props) => {
   const [navRef, handleNavStagger] = useStaggeredOpacity(
      false,
      [0.0, 0.05],
      true
   )

   React.useEffect(() => {
      const subscription = useStore.subscribe(
         state => state.SCROLL_VALUE,
         scrollValue => {
            console.log("HOME SCROLL")

            handleNavStagger(scrollValue)
         }
      )

      return () => {
         console.log("UNMOUNT")

         return subscription()
      }
   }, [handleNavStagger])
   return (
      <Wr ref={navRef}>
         <Header>Home</Header>
         <Para>
            <span>
               Sculpture studios at the Academy of Artificial Arts hums with the
            </span>
            <br />
            <span>
               rhythmic movements of robotic arms, each meticulously crafted to
            </span>
            <br />
            <span>
               mold and shape raw materials with artistic precision. Robots,
            </span>
            <br />
            <span>
               adorned in vibrant colors and intricate patterns, tirelessly
            </span>
            <br />
            <span>
               manipulate clay, marble, and synthetic polymers, their algorithms
            </span>
            <br />
            <span>
               transforming lifeless matter into captivating forms. Employing
               these
            </span>
            <br />
            <span>
               same techniques, the robots also modify their own mechanical
               parts,
            </span>
            <br />
            <span>
               transforming their bodies into living, evolving artworks that
               become
            </span>
            <br />
            <span>
               the captivating centerpiece of their own performance. In this
            </span>
            <br />
            <span>
               evolving feedback loop of technology and artistry, the sculptures
            </span>
            <br />
            <span>
               born from mechanical curiosities tell stories of perceptions of
               the
            </span>
            <br />
            <span>artificial mind.</span>
         </Para>
      </Wr>
   )
}

export default Home

const Wr = styled.div`
   grid-row: 3 / 4;
   grid-column: 1 / 4;
   font-size: 2rem;
   font-family: Cormorant;
   text-align: left;
   transition: opacity 0.1s ease-in-out;
`

const Header = styled.h1`
   /* border: red solid 2px; */
   grid-area: header;
   font-family: WONKY;
   grid-row: 2 / 3;
   grid-column: 1 / 3;
   display: flex;
   justify-content: flex-start;
   align-items: flex-end;
`

const Para = styled.p``
