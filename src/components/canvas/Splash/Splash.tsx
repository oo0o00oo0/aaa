import { gsap } from "gsap"
import React, { useEffect, useRef } from "react"
import styled from "styled-components"
import useStore from "@src/state/store"
const map_lenis = (x, in_min, in_max, out_min, out_max) => {
   return ((x - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
}

const stagger = (ref, scrollValue, dir, range) => {
   const mappedValue = map_lenis(
      scrollValue,
      range[0],
      range[1],
      dir ? 0 : 1,
      dir ? 1 : 0
   )

   const arr = [...ref.current.children]
   const length = arr.length

   arr.forEach((child, index) => {
      const relativePosition = 1 - index / length // This gives a value between 0 and 1
      const transitionDuration = 0 + 1 * relativePosition // e.g., duration ranges from 0.5s to 2s

      child.style.transition = `opacity ${transitionDuration}s`
      child.style.opacity = mappedValue.toString()
   })
}

function Splash() {
   const titleRef = useRef(null)
   const navRef = useRef(null)

   useEffect(() => {
      const subscription = useStore.subscribe(
         state => state.SCROLL_VALUE,
         scrollValue => {
            stagger(titleRef, scrollValue, false, [0, 0.2])
            stagger(navRef, scrollValue, true, [0.25, 0.3])
         }
      )

      return () => subscription()
   }, [])

   return (
      <Wr>
         <Bar></Bar>
         <Bar2></Bar2>
         <Nav ref={navRef}>
            {"AAA".split("").map((letter, letterIndex) => (
               <div
                  style={{ display: "inline-block" }}
                  key={letterIndex}>
                  {letter === " " ? "\u00A0" : letter}
               </div>
            ))}
         </Nav>
         <Title ref={titleRef}>
            {"Academy of Artificial^Arts".split("^").map((line, lineIndex) => (
               <React.Fragment key={lineIndex}>
                  {line.split("").map((letter, letterIndex) => (
                     <span key={letterIndex}>
                        {letter === " " ? "\u00A0" : letter}
                     </span>
                  ))}
                  {lineIndex === 0 && <br />}
               </React.Fragment>
            ))}
         </Title>
      </Wr>
   )
}

const Bar2 = styled.div`
   top: 0;
   left: 0;
   z-index: 9;
   position: fixed;
   height: 8.5rem;
   width: 30%;
   background-color: #eaeaead6;
`
const Bar = styled.div`
   top: 8.5rem;
   left: 0;
   z-index: 9;
   position: fixed;
   height: 4.5rem;
   width: 30%;
   background-image: linear-gradient(to top, rgba(255, 0, 0, 0), #eaeaead6);
`

const Title = styled.div`
   z-index: 9;
   font-size: 4.5rem;
   font-family: Cormorant;
   position: fixed;
`

const Nav = styled.div`
   z-index: 9;
   position: absolute;
   font-size: 4.5rem;
   font-family: WONKY;
`

const Wr = styled.div`
   padding: 2rem;
   height: 100%;
   width: 100%;
   position: fixed;
   color: #c1140a;
`

export default Splash
