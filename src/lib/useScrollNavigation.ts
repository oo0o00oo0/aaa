import { useState, useEffect, useLayoutEffect } from "react"
import { useLocation } from "wouter"

const useScrollNavigation = pages => {
   const handlePageChange = () => {
      const currentSection = Math.floor(window.scrollY / sectionHeight)

      if (
         currentSection >= 0 &&
         currentSection < totalSections &&
         pages[currentSection] !== page
      ) {
         setPage(pages[currentSection])
      }
   }
   const totalSections = pages.length
   const sectionHeight = window.innerHeight // Assuming each page section is of window's height
   const [location, setLocation] = useLocation()
   const [page, setPage] = useState(location)

   useEffect(() => {
      window.addEventListener("scroll", handlePageChange)

      return () => {
         window.removeEventListener("scroll", handlePageChange)
      }
   }, [page, totalSections, sectionHeight, pages])

   useEffect(() => {
      setLocation(page)
   }, [page, setLocation])

   useLayoutEffect(() => {
      const currentPageIndex = pages.findIndex(p => p === location)

      const scrollPosition = currentPageIndex * sectionHeight

      window.scrollTo(0, scrollPosition)
   }, [])

   return page
}

export default useScrollNavigation
