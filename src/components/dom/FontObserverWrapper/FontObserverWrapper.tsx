import useFontFaceObserver from "use-font-face-observer"

const FontObserverWrapper = ({ children }) => {
   const isFontListLoaded = useFontFaceObserver([
      {
         family: "WONKY"
      }
   ])

   if (!isFontListLoaded) {
      return null
   } else return children
}

export default FontObserverWrapper
