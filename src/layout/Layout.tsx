import { gsap } from "gsap"
import React from "react"
import styled from "styled-components"

function Layout({ children }) {
   const ref = React.useRef()
   React.useEffect(() => {
      console.log("ref")

      gsap.to(ref.current, {
         opacity: 1,
         duration: 4,
         ease: "power4.out"
      })
   }, [])

   return <Grid ref={ref}>{children}</Grid>
}

export default Layout

const Grid = styled.div`
   opacity: 0;
   font-size: 5rem;
   display: grid;
   grid-template-columns: 1fr 1fr 1fr;
   grid-template-rows: 1fr 1fr 1fr;
   /* grid-template-areas: "header" "main" "footer"; */

   height: 100%;
   width: 100%;
`
