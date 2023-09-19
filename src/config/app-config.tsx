import React from "react"

const Home = React.lazy(() => import("@src/page/Home"))
const About = React.lazy(() => import("@src/page/About"))
const Programmes = React.lazy(() => import("@src/page/Programmes"))
const Contact = React.lazy(() => import("@src/page/Contact"))

export const pageOpacity = [1, 1, 1, 1, 1]

export const texturePaths = [
   "/atlas/00_HERO.webp",
   "/atlas/atlas.webp",
   "/atlas/atlas.webp",
   "/atlas/AP_1.webp",
   "/atlas/atlas_2.webp"
]

export const routes = [
   {
      route: "/",
      title: "Home",
      component: <Home />,
      opacity: 1,
      renderPercentage: 1
   },
   {
      route: "/about",
      title: "About",
      component: <About />,
      opacity: 1,
      renderPercentage: 3
   },
   {
      route: "/programmes",
      title: "Programmes",
      component: <Programmes />,
      opacity: 0,
      renderPercentage: 1
   },
   {
      route: "/contact",
      title: "Contact",
      component: <Contact />,
      opacity: 1,
      renderPercentage: 1
   },
   {
      route: "/contact",
      title: "Contact123",
      component: <Contact />,
      opacity: 1,
      renderPercentage: 1
   }
]
