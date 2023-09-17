import { gsap } from "gsap"
import React from "react"
import styled from "styled-components"

function Layout({ children }) {
   const ref = React.useRef()
   React.useEffect(() => {
      gsap.to(ref.current, {
         opacity: 1,
         duration: 4,
         ease: "power4.out",
         delay: 0.5
      })
   }, [])

   return <Grid ref={ref}>{children}</Grid>
}

export default Layout

const Grid = styled.div`
   padding: 2vw;
   opacity: 0;
   font-size: 2rem;
   display: grid;
   grid-template-columns: 1fr 1fr 1fr 1fr;
   grid-template-rows: 1fr 1fr 1fr;

   width: 100%;
   height: 100vh;
`
