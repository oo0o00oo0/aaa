import { create } from "zustand"
import { subscribeWithSelector } from "zustand/middleware"

export interface Store {
   SCROLL_VALUE: number;
   setScrollValue: (value: number) => void;
   testState: number;
   setTestState: (value: number) => void;
}

const useStore = create(
   subscribeWithSelector<Store>(set => ({
      testState: 0,
      setTestState: (value: number) => set({ testState: value }),
      SCROLL_VALUE: 0,
      setScrollValue: (value: number) => set({ SCROLL_VALUE: value })
   }))
)

export default useStore
