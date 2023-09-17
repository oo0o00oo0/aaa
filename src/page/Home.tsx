import useStore from "@src/state/store"
import React from "react"
import styled from "styled-components"

type Props = {}

const Home = (props: Props) => {
   const ref = React.useRef<HTMLImageElement>(null)

   React.useEffect(() => {
      const subscription = useStore.subscribe(
         state => state.SCROLL_VALUE,
         scrollValue => {
            if (scrollValue < 0.04) {
               ref.current.style.opacity = "1"
            } else {
               ref.current.style.opacity = "0"
            }
         }
      )

      return () => subscription()
   }, [])

   return (
      <Wr ref={ref}>
         <Header>Home</Header>
         <Para>
            Sculpture studios at the Academy of Artificial Arts hums with the
            <br />
            rhythmic movements of robotic arms, each meticulously crafted to
            <br />
            mold and shape raw materials with artistic precision. Robots,
            <br />
            adorned in vibrant colors and intricate patterns, tirelessly
            <br />
            manipulate clay, marble, and synthetic polymers, their algorithms
            <br />
            transforming lifeless matter into captivating forms. Employing these
            <br />
            same techniques, the robots also modify their own mechanical parts,
            <br />
            transforming their bodies into living, evolving artworks that become
            <br />
            the captivating centerpiece of their own performance. In this
            <br />
            evolving feedback loop of technology and artistry, the sculptures
            <br />
            born from mechanical curiosities tell stories of perceptions of the
            <br />
            artificial mind.
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
