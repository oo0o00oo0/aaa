import React from "react"
import styled from "styled-components"
import { routes } from "@src/config/app-config"
import Layout from "@src/layout/Layout"

function ScrollLayout() {
   return (
      <React.Suspense fallback={<div>Loading...</div>}>
         {routes.map((route, i) => (
            <Layout key={route.title}>{route.component}</Layout>
         ))}
      </React.Suspense>
   )
}
export default ScrollLayout
