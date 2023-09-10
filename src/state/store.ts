import { create } from "zustand"
import { subscribeWithSelector } from "zustand/middleware"

export interface Store {
   SCROLL_VALUE: number;
   setScrollValue: (value: number) => void;

   SCROLL_VELOCITY: number;
   setScrollVelocity: (value: number) => void;
}

const useStore = create(
   subscribeWithSelector<Store>(set => ({
      SCROLL_VALUE: 0,
      setScrollValue: (value: number) => set({ SCROLL_VALUE: value }),
      SCROLL_VELOCITY: 0,
      setScrollVelocity: (value: number) => set({ SCROLL_VELOCITY: value })
   }))
)

export default useStore
