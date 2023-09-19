import React, { Suspense, useEffect, useMemo } from "react"
import styled from "styled-components"
import { routes } from "@src/config/app-config"
import Layout from "@src/layout/Layout"
import { Route, useLocation } from "wouter"
import useStore from "@src/state/store"
import { map_range } from "@src/utils/functions"
import { useLenis } from "@studio-freight/react-lenis"

function ScrollLayout() {
   useScrollNavigation(routes)

   const routeComponents = useMemo(
      () =>
         routes.map((route, i) => (
            <Layout
               index={i}
               key={route.title}>
               <Route path={route.route}>{route.component}</Route>
            </Layout>
         )),
      [routes]
   )

   return (
      <Wr style={{ height: `${routes.length * 100}vh` }}>
         <Suspense fallback={<div>Loading...</div>}>{routeComponents}</Suspense>
      </Wr>
   )
}

const Wr = styled.div`
   position: absolute;
`

const useScrollNavigation = routes => {
   const [location, navigate] = useLocation()
   const { setScrollValue, setScrollVelocity } = useStore()

   useLenis(({ scroll, velocity }) => {
      setScrollVelocity(velocity)
      setScrollValue(scroll / (window.innerHeight * (routes.length - 1)))
   })

   useEffect(() => {
      const index = routes.findIndex(route => route.route === location)
      if (index !== -1) {
         window.scrollTo(0, index * window.innerHeight + 1)
      }
   }, [location, routes])

   useEffect(() => {
      const subscription = useStore.subscribe(
         state => state.SCROLL_VALUE,
         scrollValue => {
            const mappedValue = map_range(
               scrollValue,
               0,
               1,
               0,
               routes.length - 1
            )
            const targetRoute = routes[Math.floor(mappedValue)]
            if (targetRoute && targetRoute.route !== location) {
               navigate(targetRoute.route)
            }
         }
      )

      return () => subscription()
   }, [location, navigate, routes])
}

export default ScrollLayout
