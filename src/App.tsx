//https://codesandbox.io/s/react-spring-typescript-968b1?file=/src/components/AnimatedRoutes.tsx
import React, { Suspense } from "react"
import { Router, Route } from "wouter"
import styled from "styled-components"
import TCanvas from "./components/canvas/TCanvas/TCanvas"
import useStore from "@state/store"
import UI from "@dom/UI"
import { useScrollSystem } from "@lib/useScrollSystem"
import { lazy } from "react"

const Home = lazy(() => import("./page/Home"))
const About = lazy(() => import("./page/About"))

export const App = () => {
   const ref = useScrollSystem(useStore)
   return (
      <>
         <Router>
            <Suspense fallback={<div>Loading...</div>}>
               <Route
                  path="/"
                  component={Home}
               />
               <Route
                  path="/about"
                  component={About}
               />
            </Suspense>
         </Router>

         {/* <CanvasWrapper ref={ref}>
            <TCanvas count={COUNT} />
         </CanvasWrapper>
         <UI text={text} /> */}
      </>
   )
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
