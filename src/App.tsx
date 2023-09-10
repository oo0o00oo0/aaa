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

const Home = lazy(() => import("./page/Home"))
const About = lazy(() => import("./page/About"))
const Contact = lazy(() => import("./page/Contact"))

const pages = ["/", "/about", "/programmes", "/Contact"]
export const App = () => {
   const ref = useScrollSystem(useStore)
   useScrollNavigation(pages)

   const scrolly = false

   return (
      <>
         <div
            ref={ref}
            style={{
               height: `${(pages.length + 1) * 100}vh`
            }}>
            <Router>
               <FontObserverWrapper>
                  {scrolly ? <ScrollLayout /> : <RouteLayout />}
               </FontObserverWrapper>
            </Router>
         </div>

         <CanvasWrapper>
            <TCanvas
               count={pages.length}
               scrolly={scrolly}
            />
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
      <React.Suspense fallback={<div>Loading...</div>}>
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
   box-sizing: border-box;
   position: fixed;
   top: 0;
   left: 0;
   width: 100vw;
   height: 100vh;
`

export default App
