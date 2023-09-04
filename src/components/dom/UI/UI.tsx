//https://codesandbox.io/s/react-spring-typescript-968b1?file=/src/components/AnimatedRoutes.tsx

import React from "react"
import styled from "styled-components"
import { mapLinear } from "three/src/math/MathUtils"

const UI = ({ text }) => {
   const count = text.split("").length
   return (
      <>
         <ScollClick count={count} />
         <BG
            text={text}
            count={count}
         />
      </>
   )
}

const BG = ({ count, text }) => {
   let t = new Array(count).fill(0)

   return (
      <div
         style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end"
         }}>
         {t.map((_, i) => (
            <div
               key={i}
               style={{
                  color: "#CCC2AB",
                  fontSize: `25vh`,
                  margin: "25vh",
                  paddingRight: "4rem"
               }}>
               {text.split("")[i]}
            </div>
         ))}
      </div>
   )
}

const ScollClick = ({ count }) => {
   let t = new Array(count).fill(0)

   const scrollHeightRef = React.useRef<number>(0)
   const innerHeightRef = React.useRef<number>(0)

   React.useLayoutEffect(() => {
      scrollHeightRef.current = document.body.scrollHeight
      innerHeightRef.current = window.innerHeight
   }, [])

   return (
      <Wr>
         {t.map((_, i) => {
            return (
               <Level
                  key={i}
                  onClick={() => {
                     window.scrollTo({
                        top: mapLinear(
                           i,
                           0,
                           count,
                           0,
                           scrollHeightRef.current - innerHeightRef.current
                        ),
                        //@ts-ignore
                        behavior: "instant"
                     })
                  }}
                  style={{ color: "#CCC2AB" }}>
                  {i}
               </Level>
            )
         })}
      </Wr>
   )
}

const Wr = styled.div`
   position: fixed;
   width: 9rem;
   height: 100vh;
   display: flex;
   flex-direction: column;
`
const Level = styled.div`
   flex: 1;
   border: #ccc2ab solid 1px;
   cursor: pointer;
   display: flex;
   justify-content: center;
   align-items: center;
`

export default UI
