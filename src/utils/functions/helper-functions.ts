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

export const map_range = (x, in_min, in_max, out_min, out_max) => {
   return ((x - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
}

export const stagger = (ref, scrollValue, dir, range) => {
   const mappedValue = map_range(
      scrollValue,
      range[0],
      range[1],
      dir ? 0 : 1,
      dir ? 1 : 0
   )
   const arr = [...ref.current.children]
   const length = arr.length

   arr.forEach((child, index) => {
      const maxDelay = 1 - mappedValue // The maximum possible delay, it's dynamic based on mappedValue
      const indexDelay = index / (length - 1) // This will range from 0 to 1 based on the element's index
      const delay = maxDelay * indexDelay // Combining the above two
      const effectiveValue = Math.min(Math.max(mappedValue - delay, 0), 1) // Ensuring opacity remains within [0, 1]

      child.style.opacity = effectiveValue.toString()
   })
}
