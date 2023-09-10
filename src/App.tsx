//https://codesandbox.io/s/react-spring-typescript-968b1?file=/src/components/AnimatedRoutes.tsx
import React from "react"
import { Router } from "wouter"
import styled from "styled-components"
import { ReactLenis, useLenis } from "@studio-freight/react-lenis"
import TCanvas from "./components/canvas/TCanvas/TCanvas"
import useStore from "@state/store"
import useFontFaceObserver from "use-font-face-observer"
import Programmes from "./page/Programmes"
import Splash from "./components/canvas/Splash/Splash"

const Home = React.lazy(() => import("./page/Home"))
const About = React.lazy(() => import("./page/About"))
const Contact = React.lazy(() => import("./page/Contact"))

const pages = ["/", "/about", "/programmes", "/Contact"]

export const App = () => {
   const setScrollValue = useStore(s => s.setScrollValue)
   const setScrollVelocity = useStore(s => s.setScrollVelocity)

   useLenis(({ scroll, velocity }) => {
      setScrollVelocity(velocity)
      setScrollValue(scroll / (window.innerHeight * (pages.length - 1)))
   })

   return (
      <>
         <ReactLenis root>
            <div>
               <Router>
                  <FontObserverWrapper>
                     <StaticPages />
                     <ScrollLayout /> :
                  </FontObserverWrapper>
               </Router>
            </div>
         </ReactLenis>

         <CanvasWrapper>
            <TCanvas count={pages.length} />
         </CanvasWrapper>
      </>
   )
}
function StaticPages() {
   return <Splash />
}

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

const FontObserverWrapper = ({ children }) => {
   const isFontListLoaded = useFontFaceObserver([
      {
         family: "WONKY"
      }
   ])

   if (!isFontListLoaded) {
      return null
   } else return children
}

const CanvasWrapper = styled.div`
   pointer-events: none;
   /* z-index: 2; */
   box-sizing: border-box;
   position: fixed;
   top: 0;
   left: 0;
   width: 100vw;
   height: 100vh;
`

export default App
