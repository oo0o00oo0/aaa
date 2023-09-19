import { Suspense, useMemo } from "react"
import { routes } from "@src/config/app-config"
import Layout from "@src/layout/Layout"
import useScrollNavigation from "@src/lib/useScrollNavigation"

function ScrollLayout() {
   useScrollNavigation(routes)

   const routeComponents = useMemo(
      () =>
         routes.map((route, i) => (
            <Layout
               index={i}
               key={route.title}>
               {/* <Route path={route.route}>{route.component}</Route> */}
               {route.component}
            </Layout>
         )),
      [routes]
   )

   return (
      <div style={{ height: `${routes.length * 100}vh` }}>
         <Suspense fallback={<div>Loading...</div>}>{routeComponents}</Suspense>
      </div>
   )
}

export default ScrollLayout
