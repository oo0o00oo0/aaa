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
