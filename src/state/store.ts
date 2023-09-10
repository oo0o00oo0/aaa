import { create } from "zustand"
import { subscribeWithSelector } from "zustand/middleware"

export interface Store {
   SCROLL_VALUE: number;
   setScrollValue: (value: number) => void;
}

const useStore = create(
   subscribeWithSelector<Store>(set => ({
      SCROLL_VALUE: 0,
      setScrollValue: (value: number) => set({ SCROLL_VALUE: value })
   }))
)

export default useStore
