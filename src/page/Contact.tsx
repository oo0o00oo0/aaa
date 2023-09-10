import Layout from "@src/layout/Layout"
import styled from "styled-components"

type Props = {}

const Contact = (props: Props) => {
   return (
      <Layout>
         <Header>Contact</Header>
      </Layout>
   )
}

const Header = styled.h1`
   grid-area: header;
   font-family: WONKY;
   grid-row: 1/2;
`

export default Contact
