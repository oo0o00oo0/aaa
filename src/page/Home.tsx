import Layout from "@src/layout/Layout"
import styled from "styled-components"

type Props = {}

const Home = (props: Props) => {
   return (
      <>
         <Header>Home</Header>
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
      </>
   )
}

export default Home

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

const Para = styled.p`
   grid-row: 3 / 4;
   grid-column: 1 / 3;
   font-size: 2rem;
   font-family: Cormorant;
   text-align: left;
`
