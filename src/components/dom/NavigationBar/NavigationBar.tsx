import React from "react"
import styled from "styled-components"
import useStore from "@src/state/store"
import { useStaggeredOpacity } from "@src/utils/functions/helper-functions"
import Layout from "@src/layout/Layout"

type LetterProps = {
   initialOpacity?: number
}

function NavigationBar() {
   const [titleRef, handleTitleStagger] = useStaggeredOpacity(false, [0, 0.05])
   const [navRef, handleNavStagger] = useStaggeredOpacity(true, [0.05, 0.1])

   React.useEffect(() => {
      const subscription = useStore.subscribe(
         state => state.SCROLL_VALUE,
         scrollValue => {
            handleTitleStagger(scrollValue)
            handleNavStagger(scrollValue)
         }
      )

      return () => subscription()
   }, [handleTitleStagger, handleNavStagger])

   return (
      <Wrapper>
         {/* <Bar /> */}
         {/* <Bar2 /> */}
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
   opacity: ${({ initialOpacity }) => initialOpacity};
`

const Title = styled.div`
   z-index: 9;
   font-family: Cormorant;
`

const Navigation = styled.div`
   max-height: fit-content;
   z-index: 9;
   position: absolute;
   font-family: WONKY;
`

const Wrapper = styled.div`
   padding: 3rem 2rem;
   text-align: top;
   position: fixed;
   height: 15vh;
   width: 100%;
   line-height: 1;
   font-size: calc(5vh - 2rem);

   color: #c1140a;
`

// const Bar2 = styled.div`
//    top: 0;
//    left: 0;
//    z-index: 9;
//    position: fixed;
//    height: 60vh;
//    width: 100%;
//    background-color: #eaeaea;
//    /* border: gray solid 1px; */
// `
// const Bar = styled.div`
//    top: 60vh;
//    left: 0;
//    z-index: 9;
//    position: fixed;
//    height: 4vh;
//    width: 100%;
//    background-image: linear-gradient(to top, rgba(255, 0, 0, 0), #eaeaea);
//    /* background-image: linear-gradient(to top, rgba(255, 0, 0, 0), #eaeaea); */
//    /* border-bottom: gray solid 1px; */
// `
export default NavigationBar
