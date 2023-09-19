import { gsap } from "gsap"
import React from "react"
import styled from "styled-components"

function Layout({ children, index }) {
   const ref = React.useRef()
   React.useEffect(() => {
      gsap.to(ref.current, {
         opacity: 1,
         duration: 4,
         ease: "power4.out",
         delay: 0.5
      })
   }, [])

   return (
      <Grid
         style={{ top: `${index * 100}vh` }}
         ref={ref}>
         {children}
      </Grid>
   )
}

export default Layout

const Grid = styled.div`
   position: absolute;
   /* border: red solid 1px; */
   padding: 2vw;
   opacity: 0;
   font-size: 2rem;
   display: grid;
   grid-template-columns: 1fr 1fr 1fr 1fr;
   grid-template-rows: 1fr 1fr 1fr;

   width: 100%;
   height: 100vh;
`
