import styled from "styled-components"

type Props = {}

const Contact = (props: Props) => {
   return (
      <>
         <Header>Contact</Header>
      </>
   )
}

const Header = styled.h1`
   grid-area: header;
   font-family: WONKY;
   grid-row: 1/2;
`

export default Contact
