import React, { MutableRefObject } from "react"

type UseStaggeredOpacityReturn = [
   MutableRefObject<any>,
   (scrollValue: any) => void
]

export const useStaggeredOpacity = (
  dir: boolean,
  range: [number, number],
  reverse: boolean = false
): UseStaggeredOpacityReturn => {
  const ref = React.useRef(null);

  // Recursive helper function to get all children
  const getAllChildren = (element: HTMLElement): HTMLElement[] => {
    const children = Array.from(element.children) as HTMLElement[];
    return children.reduce((acc, child) => {
      return acc.concat(child, getAllChildren(child));
    }, [] as HTMLElement[]);
  };

  const handleStagger = (scrollValue: number) => {
    if (!ref.current) return;

    const mappedValue = map_range(
      scrollValue,
      range[0],
      range[1],
      dir ? 0 : 1,
      dir ? 1 : 0
    );

    // Use the helper function to get all nested children
    const arr = getAllChildren(ref.current);
    const length = arr.length;

    if (reverse) {
      arr.reverse();
    }

    arr.forEach((child, index) => {
      const maxDelay = 1 - mappedValue;
      const indexDelay = index / (length - 1);
      const delay = maxDelay * indexDelay;
      const effectiveValue = Math.min(Math.max(mappedValue - delay, 0), 1);
      child.style.opacity = effectiveValue.toString();
    });
  };

  return [ref, handleStagger];
};

const getAllChildren = (element: HTMLElement): HTMLElement[] => {
  const children = Array.from(element.children) as HTMLElement[];
  return children.reduce((acc, child) => {
    return acc.concat(child, getAllChildren(child));
  }, [] as HTMLElement[]);
};

// Map function
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



// export const map_range = (x, in_min, in_max, out_min, out_max) => {
//    return ((x - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
// }
