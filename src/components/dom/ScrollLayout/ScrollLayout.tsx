import Programmes from "@src/page/Programmes"
import React from "react"
import styled from "styled-components"

const Home = React.lazy(() => import("@src/page/Home"))
const About = React.lazy(() => import("@src/page/About"))
const Contact = React.lazy(() => import("@src/page/Contact"))

function ScrollLayout() {
   return (
      <React.Suspense fallback={<div>Loading...</div>}>
         <PageWr>
            <Home />
         </PageWr>
         <PageWr>
            <About />
         </PageWr>
         <PageWr>
            <Programmes />
         </PageWr>
         <PageWr>
            <Contact />
         </PageWr>
      </React.Suspense>
   )
}

const PageWr = styled.div`
   width: 100%;
   height: 100vh;
   display: flex;
   align-items: center;
   justify-content: center;
`
export default ScrollLayout
