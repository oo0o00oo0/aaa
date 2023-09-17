//https://codesandbox.io/s/react-spring-typescript-968b1?file=/src/components/AnimatedRoutes.tsx

import { Router } from "wouter"
import styled from "styled-components"
import { ReactLenis, useLenis } from "@studio-freight/react-lenis"
import TCanvas from "./components/canvas/TCanvas/TCanvas"
import useStore from "@state/store"
import NavigationBar from "./components/dom/NavigationBar/NavigationBar"
import FontObserverWrapper from "./components/dom/FontObserverWrapper/FontObserverWrapper"
import ScrollLayout from "./components/dom/ScrollLayout/ScrollLayout"

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
            <Router>
               <FontObserverWrapper>
                  <StaticPages />
                  <ScrollLayout />
               </FontObserverWrapper>
            </Router>
         </ReactLenis>

         <CanvasWrapper>
            <TCanvas count={pages.length} />
         </CanvasWrapper>
      </>
   )
}
function StaticPages() {
   return <NavigationBar />
}

const CanvasWrapper = styled.div`
   pointer-events: none;
   box-sizing: border-box;
   position: fixed;
   top: 0;
   left: 0;
   width: 100vw;
   height: 100vh;
`

export default App
