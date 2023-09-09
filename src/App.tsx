//https://codesandbox.io/s/react-spring-typescript-968b1?file=/src/components/AnimatedRoutes.tsx
import React, { Suspense } from "react"
import { Router, Route, useLocation } from "wouter"
import styled from "styled-components"
import TCanvas from "./components/canvas/TCanvas/TCanvas"
import useStore from "@state/store"
import UI from "@dom/UI"
import { useScrollSystem } from "@lib/useScrollSystem"
import { lazy } from "react"
import useFontFaceObserver from "use-font-face-observer"
import useScrollNavigation from "./lib/useScrollNavigation"
import Programmes from "./page/Programmes"

const Home = lazy(() => import("./page/Home"))
const About = lazy(() => import("./page/About"))

export const App = () => {
   const ref = useScrollSystem(useStore)
   console.log("render app")

   return (
      <>
         <Router>
            <FontObserverWrapper>
               <Suspense fallback={<div>Loading...</div>}>
                  <div
                     style={{
                        position: "fixed"
                     }}>
                     <Route
                        path="/"
                        component={Home}
                     />
                     <Route
                        path="/about"
                        component={About}
                     />
                     <Route
                        path="/programmes"
                        component={Programmes}
                     />
                  </div>
               </Suspense>
            </FontObserverWrapper>
            <Navigator />
         </Router>

         <CanvasWrapper ref={ref}>
            <TCanvas count={3} />
         </CanvasWrapper>
         <UI text={"123"} />
         <div
            style={{
               height: "300vh"
            }}></div>
      </>
   )
}

function Navigator() {
   const page = useScrollNavigation(["/", "/about", "/programmes"])

   return null
}

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
