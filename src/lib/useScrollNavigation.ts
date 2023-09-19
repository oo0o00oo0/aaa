import useStore from "@src/state/store"
import { useLenis } from "@studio-freight/react-lenis"
import { useEffect } from "react"

const useScrollNavigation = routes => {
   // const [location, navigate] = useLocation()
   const { setScrollValue, setScrollVelocity } = useStore()

   useLenis(({ scroll, velocity }) => {
      console.log(scroll / (window.innerHeight * (routes.length - 1)))

      setScrollVelocity(velocity)
      setScrollValue(scroll / (window.innerHeight * (routes.length - 1)))
   })

   useEffect(() => {
      window.scrollTo(0, 0)
      // const index = routes.findIndex(route => route.route === location)
      // if (index !== -1) {
      //    window.scrollTo(0, index * window.innerHeight + 1)
      // }
   }, [])

   // useEffect(() => {
   //    const subscription = useStore.subscribe(
   //       state => state.SCROLL_VALUE,
   //       scrollValue => {
   //          const mappedValue = map_range(
   //             scrollValue,
   //             0,
   //             1,
   //             0,
   //             routes.length - 1
   //          )
   //          const targetRoute = routes[Math.floor(mappedValue * 2)]
   //          if (targetRoute && targetRoute.route !== location) {
   //             navigate(targetRoute.route)
   //          }
   //       }
   //    )

   //    return () => subscription()
   // }, [location, navigate, routes])
}

export default useScrollNavigation
