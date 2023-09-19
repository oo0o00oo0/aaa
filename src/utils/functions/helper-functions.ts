import React from "react"
type UseStaggeredOpacityReturn = [any, (scrollValue: number) => void]

export const useStaggeredOpacity = (
   range: number[]
): UseStaggeredOpacityReturn => {
   const ref = React.useRef<HTMLElement | null>(null)

   const handleStagger = scrollValue => {
      if (!ref.current) return

      let mappedValue
      if (scrollValue <= range[1]) {
         mappedValue = map_range(scrollValue, range[0], range[1], 0, 1)
      } else if (scrollValue <= range[2]) {
         mappedValue = 1
      } else {
         mappedValue = map_range(scrollValue, range[2], range[3], 1, 0)
      }

      const arr = getAllChildren(ref.current)
      const length = arr.length

      if (scrollValue > range[2]) {
         arr.reverse()
      }

      arr.forEach((child, index) => {
         const maxDelay = 1 - mappedValue
         const indexDelay = index / (length - 1)
         const delay = maxDelay * indexDelay
         const effectiveValue = Math.min(Math.max(mappedValue - delay, 0), 1)
         child.style.opacity = effectiveValue.toString()
      })
   }

   return [ref, handleStagger]
}

const getAllChildren = element => {
   const children = Array.from(element.children)
   return children.reduce((acc: any[], child) => {
      return acc.concat(child, getAllChildren(child))
   }, [])
}

export const map_range = (value, low1, high1, low2, high2) => {
   return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1)
}

export function insertEveryNth(arr, nth, count, value = 0) {
   let result = []
   for (let i = 0; i < arr.length; i++) {
      result.push(arr[i])
      if ((i + 1) % nth === 0) {
         for (let j = 0; j < count; j++) {
            result.push(value)
         }
      }
   }
   return result
}
