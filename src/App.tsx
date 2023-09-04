//https://codesandbox.io/s/react-spring-typescript-968b1?file=/src/components/AnimatedRoutes.tsx
import React, { Suspense } from "react"
import { Router, Route } from "wouter"
import styled from "styled-components"
import TCanvas from "./components/canvas/TCanvas/TCanvas"
import useStore from "@state/store"
import UI from "@dom/UI"
import { useScrollSystem } from "@lib/useScrollSystem"
import { lazy } from "react"
import useFontFaceObserver from "use-font-face-observer"

const Home = lazy(() => import("./page/Home"))
const About = lazy(() => import("./page/About"))

export const App = () => {
   const ref = useScrollSystem(useStore)

   const [text, setText] = React.useState(false)

   React.useEffect(() => {
      addEventListener("scroll", e => {
         if (window.scrollY > 400) {
            setText(true)
         }
         if (window.scrollY < 400) {
            setText(false)
         }
         // console.log("scroll", window.scrollY)
      })
   }, [])
   React.useEffect(() => {
      console.log("TEEXT", text)
   }, [text])

   return (
      <>
         <Router>
            <FontObserverWrapper>
               <Suspense fallback={<div>Loading...</div>}>
                  <div
                     style={{
                        position: "fixed"
                     }}>
                     {!text && <Home />}

                     {text && <About />}

                     {/* <Route
                     path="/"
                     component={Home}
                  />
                  <Route
                     path="/about"
                     component={About}
                  /> */}
                  </div>
               </Suspense>
            </FontObserverWrapper>
         </Router>

         {/* <CanvasWrapper ref={ref}>
            <TCanvas count={COUNT} />
         </CanvasWrapper>
         <UI text={text} /> */}
         <div
            style={{
               height: "300vh"
            }}></div>
      </>
   )
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
