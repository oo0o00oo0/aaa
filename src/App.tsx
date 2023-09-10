//https://codesandbox.io/s/react-spring-typescript-968b1?file=/src/components/AnimatedRoutes.tsx
import React from "react"
import { Router, Route, useLocation } from "wouter"
import styled from "styled-components"
import TCanvas from "./components/canvas/TCanvas/TCanvas"
import useStore from "@state/store"
import { useScrollSystem } from "@lib/useScrollSystem"
import { lazy } from "react"
import useFontFaceObserver from "use-font-face-observer"
import useScrollNavigation from "./lib/useScrollNavigation"
import Programmes from "./page/Programmes"
import { ReactLenis, useLenis } from "@studio-freight/react-lenis"
import Div100vh from "react-div-100vh"

const Home = lazy(() => import("./page/Home"))
const About = lazy(() => import("./page/About"))
const Contact = lazy(() => import("./page/Contact"))

const pages = ["/", "/about", "/programmes", "/Contact"]

export const App = () => {
   const ref = useScrollSystem(useStore)
   const scrolly = true

   return (
      <>
         <Div100vh>
            <ReactLenis
               options={{}}
               root>
               <div
                  ref={ref}
                  style={{
                     height: `${(pages.length + (scrolly ? 0 : 1)) * 100}vh`
                  }}>
                  <Router>
                     <FontObserverWrapper>
                        <ScrollLayout /> :
                     </FontObserverWrapper>
                  </Router>
               </div>
            </ReactLenis>
         </Div100vh>

         <CanvasWrapper>
            <TCanvas count={pages.length} />
         </CanvasWrapper>
      </>
   )
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

function RouteLayout() {
   return (
      <React.Fragment>
         <PageWr style={{ position: "fixed" }}>
            <Route
               path="/"
               component={Home}
            />
         </PageWr>
         <PageWr style={{ position: "fixed" }}>
            <Route
               path="/about"
               component={About}
            />
         </PageWr>
         <PageWr style={{ position: "fixed" }}>
            <Route
               path="/programmes"
               component={Programmes}
            />
         </PageWr>
         <PageWr style={{ position: "fixed" }}>
            <Route
               path="/contact"
               component={Contact}
            />
         </PageWr>
      </React.Fragment>
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
   z-index: -1;
   box-sizing: border-box;
   position: fixed;
   top: 0;
   left: 0;
   width: 100vw;
   height: 100vh;
`

export default App
