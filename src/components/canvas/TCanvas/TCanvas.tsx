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
import ContinuousMorph from "@canvas/ContinuousMorph/ContinuousMorph"
import { Perf } from "r3f-perf"

export const TCanvas = ({ count }) => {
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
            <Moprhings count={count} />
         </Suspense>
      </Canvas>
   )
}

const Moprhings = ({ count }) => {
   const { textures, DATA_TEXTURES } = useAssets(morphData)

   const { viewport } = useThree()

   const tempSizeHeightPercentage = 0.5

   return (
      <>
         {/* <group position={[0, 0, 0]}>
            <ContinuousMorph
               count={count}
               dataTextures={DATA_TEXTURES}
               textures={textures}
            />
         </group> */}

         <group
            scale={[
               viewport.height * tempSizeHeightPercentage,
               viewport.height * tempSizeHeightPercentage,
               1
            ]}>
            <DiscreteMorph
               // debounce={250}
               count={count}
               dataTextures={DATA_TEXTURES}
               textures={textures}
            />
         </group>
      </>
   )
}

export default TCanvas
