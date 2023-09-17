import React from "react"

const Home = React.lazy(() => import("@src/page/Home"))
const About = React.lazy(() => import("@src/page/About"))
const Programmes = React.lazy(() => import("@src/page/Programmes"))
const Contact = React.lazy(() => import("@src/page/Contact"))

export const pageOpacity = [1, 1, 0, 1]

export const routes = [
   {
      route: "/",
      title: "Home",
      component: <Home />,
      opacity: 1
   },
   {
      route: "/about",
      title: "About",
      component: <About />,
      opacity: 1
   },
   {
      route: "/programmes",
      title: "Programmes",
      component: <Programmes />,
      opacity: 0
   },
   {
      route: "/contact",
      title: "Contact",
      component: <Contact />,
      opacity: 1
   }
]
