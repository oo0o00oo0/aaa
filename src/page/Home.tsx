import styled from "styled-components"
import { Grid_1 } from "@src/layout/layout"
import { Link } from "wouter"
import useScrollNavigation from "@src/lib/useScrollNavigation"

type Props = {}

const Home = (props: Props) => {
   const page = useScrollNavigation(["/", "/about"])
   return (
      <Grid_1>
         <Link href="/about">
            <Header>AAA</Header>
         </Link>
      </Grid_1>
   )
}

const Header = styled.h1`
   grid-area: header;
   font-family: WONKY;
`

export default Home
