import React from "react"

export const useScrollSystem = useStore => {
   const ref = React.useRef<HTMLDivElement>()
   const scrollHeightRef = React.useRef<number>(0)
   const innerHeightRef = React.useRef<number>(0)

   const setScrollValue = useStore(s => s.setScrollValue)

   const handleScroll = () => {
      setScrollValue(
         window.scrollY / (scrollHeightRef.current - innerHeightRef.current)
      )
   }

   const handleResize = () => {
      scrollHeightRef.current = document.body.scrollHeight
      innerHeightRef.current = window.innerHeight
      handleScroll()
   }

   React.useLayoutEffect(() => {
      setScrollValue(
         window.scrollY / (scrollHeightRef.current - innerHeightRef.current)
      )
      scrollHeightRef.current = document.body.scrollHeight
      innerHeightRef.current = window.innerHeight

      window.addEventListener("scroll", handleScroll)
      window.addEventListener("resize", handleResize)

      return () => {
         window.removeEventListener("scroll", handleScroll)
         window.removeEventListener("resize", handleResize)
      }
   }, [])

   return ref
}
