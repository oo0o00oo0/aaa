import { Canvas, extend, useThree } from "@react-three/fiber"
import React, { Suspense } from "react"
import DiscreteMorph from "@canvas/DiscreteMorph"
import {
   DoubleSide,
   OrthographicCamera as OrthographicCameraImpl,
   Vector3
} from "three"

import { morphData } from "@src/data/morph_data"
import { useAssets } from "@src/lib/useAssets"

export const TCanvas = ({ count, scrolly }) => {
   return (
      <Canvas
         frameloop="demand"
         orthographic
         camera={{
            position: new Vector3(0, 0, 1),
            zoom: 1
         }}
         dpr={window.devicePixelRatio}>
         <Suspense fallback={null}>
            <Moprhings
               count={count}
               scrolly={scrolly}
            />
         </Suspense>
      </Canvas>
   )
}

const Moprhings = ({ count, scrolly }) => {
   const { textures, DATA_TEXTURES } = useAssets(morphData)

   const { viewport } = useThree()

   const tempSizeHeightPercentage = 0.4

   return (
      <group
         scale={[
            viewport.height * tempSizeHeightPercentage,
            viewport.height * tempSizeHeightPercentage,
            1
         ]}>
         <DiscreteMorph
            scrolly={scrolly}
            // debounce={250}
            count={count}
            dataTextures={DATA_TEXTURES}
            textures={textures}
         />
      </group>
   )
}

export default TCanvas
