import React from "react"
import { ReactLenis, useLenis } from "@studio-freight/react-lenis"

export const useScrollSystem = useStore => {
   const setScrollValue = useStore(s => s.setScrollValue)

   useLenis(({ scroll, velocity }) => {
      // console.log(velocity)

      setScrollValue(scroll / (window.innerHeight * 3))

      // called every scroll
   })
   const ref = React.useRef<HTMLDivElement>()
   // const scrollHeightRef = React.useRef<number>(0)
   // const innerHeightRef = React.useRef<number>(0)

   // const handleScroll = () => {
   //    setScrollValue(
   //       window.scrollY / (scrollHeightRef.current - innerHeightRef.current)
   //    )
   // }

   // const handleResize = () => {
   //    scrollHeightRef.current = document.body.scrollHeight
   //    innerHeightRef.current = window.innerHeight
   //    handleScroll()
   // }

   // React.useLayoutEffect(() => {
   //    console.log("REF", ref.current.scrollHeight)

   //    setScrollValue(
   //       window.scrollY / (scrollHeightRef.current - innerHeightRef.current)
   //    )
   //    scrollHeightRef.current = document.body.scrollHeight
   //    innerHeightRef.current = window.innerHeight

   //    window.addEventListener("scroll", handleScroll)
   //    window.addEventListener("resize", handleResize)

   //    return () => {
   //       window.removeEventListener("scroll", handleScroll)
   //       window.removeEventListener("resize", handleResize)
   //    }
   // }, [])

   return ref
}
