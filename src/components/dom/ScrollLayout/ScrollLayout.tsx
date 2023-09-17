import React from "react"
import styled from "styled-components"
import { routes } from "@src/config/app-config"

function ScrollLayout() {
   return (
      <React.Suspense fallback={<div>Loading...</div>}>
         {routes.map((route, i) => (
            <PageWr key={route.title}>{route.component}</PageWr>
         ))}
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
export default ScrollLayout
