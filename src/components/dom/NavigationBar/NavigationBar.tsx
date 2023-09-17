import React from "react"
import styled from "styled-components"
import useStore from "@src/state/store"
import { stagger } from "@src/utils/functions/helper-functions"

type LetterProps = {
   initialOpacity?: number
}

function NavigationBar() {
   const titleRef = React.useRef(null)
   const navRef = React.useRef(null)

   React.useEffect(() => {
      const subscription = useStore.subscribe(
         state => state.SCROLL_VALUE,
         scrollValue => {
            stagger(titleRef, scrollValue, false, [0, 0.25])
            stagger(navRef, scrollValue, true, [0.25, 0.35])
         }
      )

      return () => subscription()
   }, [])

   return (
      <Wrapper>
         <Bar />
         <Bar2 />
         <Navigation ref={navRef}>
            {"AAA".split("").map((letter, index) => (
               <Letter
                  key={index}
                  initialOpacity={0}>
                  {letter === " " ? "\u00A0" : letter}
               </Letter>
            ))}
         </Navigation>
         <Title ref={titleRef}>
            {"Academy of Artificial^Arts".split("^").map((line, lineIndex) => (
               <React.Fragment key={lineIndex}>
                  {line.split("").map((letter, letterIndex) => (
                     <Letter
                        key={letterIndex}
                        initialOpacity={1}>
                        {letter === " " ? "\u00A0" : letter}
                     </Letter>
                  ))}
                  {lineIndex === 0 && <br />}
               </React.Fragment>
            ))}
         </Title>
      </Wrapper>
   )
}

const Letter =
   styled.span <
   LetterProps >
   `
   display: inline-block;
   opacity: ${({ initialOpacity }) => initialOpacity};
`
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

const Navigation = styled.div`
   z-index: 9;
   position: absolute;
   font-size: 4.5rem;
   font-family: WONKY;
`

const Wrapper = styled.div`
   padding: 2rem;
   height: 100%;
   width: 100%;
   position: fixed;
   color: #c1140a;
`

export default NavigationBar
