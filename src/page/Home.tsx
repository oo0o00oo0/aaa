import Layout from "@src/layout/Layout"
import styled from "styled-components"
import { Link } from "wouter"

type Props = {}

const Home = (props: Props) => {
   return (
      <Layout>
         <Link href="/about">
            <Header>AAA</Header>
         </Link>
      </Layout>
   )
}

const Header = styled.h1`
   grid-area: header;
   font-family: WONKY;
   grid-row: 1 / 2;
   grid-column: 3 / 4;
`

export default Home
